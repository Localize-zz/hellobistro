import decode from 'jwt-decode';
// import io from 'socket.io-client';
import SocketService from './SocketService';

const AuthService = {
  domain: 'http://localhost:3000',

  webSocket: null,

  customerRegister: (userName, firstName, lastName, password, zip, phone, email) => AuthService.fetch('/register/customers', {
    method: 'POST',
    body: {
      userName, firstName, lastName, password, zip, phone, email 
    },
  }),

  restaurantRegister: (email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type) => AuthService.fetch('/register/restaurants', {
    method: 'POST',
    body: {
 email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type 
},
  }),

  login: (email, password) =>
    // Get a token from api server using the fetch api
    AuthService.fetch('/login/customers', {
      method: 'POST',
      body: {
        email,
        password,
      },
    }).then((res) => {
      // Setting the token in localStorage
      AuthService.setToken(res.token);
      // Setting user identification on websocket connection
      SocketService.setUser({ userId: res.userId, userType: res.userType });
      return res;
    }),

  restaurantLogin: (email, password) =>
    // Get a token from api server using the fetch api
    AuthService.fetch('/login/restaurants', {
      method: 'POST',
      body: {
        email,
        password,
      },
    }).then((res) => {
      AuthService.setToken(res.token); // Setting the token in localStorage
      SocketService.setUser({ userId: res.userId, userType: res.userType });
      return res;
    }),

  loggedIn: () => {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken(); // GEtting token from localstorage
    return !!token && !AuthService.isTokenExpired(token); // handwaiving here
  },

  isTokenExpired: (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },

  setToken: (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  },

  getToken: () =>
    // Retrieves the user token from localStorage
    localStorage.getItem('id_token'),

  decodeToken: () => {
    return new Promise((resolve) => {
      const token = localStorage.getItem('id_token');
      const decoded = decode(token);
      resolve(decoded);
    });
  },

  logout: () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    SocketService.clearUser();
  },

  getProfile: () =>
    // Using jwt-decode npm package to decode the token
    decode(AuthService.getToken()),


  fetch: (url, options = {}) => {
    // performs api calls sending the required authentication headers
    options.body = JSON.stringify(options.body);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (AuthService.loggedIn()) {
      headers.Authorization = `Bearer ${AuthService.getToken()}`;
    }

    return fetch(AuthService.domain + url, { headers, ...options })
      .then(AuthService._checkStatus)
      .then(response => response.json());
  },

  _checkStatus: (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  },
};

export default AuthService;
