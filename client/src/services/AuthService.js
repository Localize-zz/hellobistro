import decode from 'jwt-decode';
import io from 'socket.io-client';
let webSocket = null;

const AuthService = {
  domain: 'http://localhost:3000',

  customerRegister: (userName, firstName, lastName, password, zip, phone, email) => {
    return AuthService.fetch('/register/customers', {
      method: 'POST',
      body: { userName, firstName, lastName, password, zip, phone, email }
    })
  },

  restaurantRegister: (email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type) => {
    return AuthService.fetch('/register/restaurants', {
      method: 'POST',
      body: { email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type }
    })
  },

  login: (email, password) => {
    // Get a token from api server using the fetch api
    return AuthService.fetch('/login/customers', {
      method: 'POST',
      body: {
        email,
        password,
      },
    }).then((res) => {
      // Setting the token in localStorage
      AuthService.setToken(res.token);
      // Establishing websocket connection and sending token
      webSocket = io.connect('http://localhost:3000');
      webSocket.emit('data', { token: res.token, userId: res.userId });
      return res;
    });
  },

  restaurantLogin: (email, password) => {
    // Get a token from api server using the fetch api
    return AuthService.fetch('/login/restaurants', {
      method: 'POST',
      body: {
        email,
        password
      }
    }).then(res => {
      AuthService.setToken(res.token) // Setting the token in localStorage
      return res;
    })
  },

  loggedIn: () => {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken() // GEtting token from localstorage
    return !!token && !AuthService.isTokenExpired(token) // handwaiving here
  },

  isTokenExpired: (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  },

  setToken: (idToken) => {
    console.log('setting token', idToken)
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  },

  getToken: () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  },

  logout: () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    console.log('disconnect called')
    webSocket.disconnect();
  },

  getProfile: () => {
    // Using jwt-decode npm package to decode the token
    return decode(AuthService.getToken());
  },


  fetch: (url, options = {}) => {
    // performs api calls sending the required authentication headers
    options.body = JSON.stringify(options.body);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (AuthService.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + AuthService.getToken()
    }

    return fetch(AuthService.domain + url, { headers, ...options })
      .then(AuthService._checkStatus)
      .then(response => response.json());
  },

  _checkStatus: (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

export default AuthService;