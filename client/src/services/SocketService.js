import { dispatch } from 'redux';
import openSocket from 'socket.io-client';
import { addNotification, loadOrders, addOpenOrders, refreshOpenOrders, updateOrder } from '../actions/actionCreators';
import store from '../store';
import AuthService from './AuthService';
import ApiService from './ApiService';
// create socket connection
const socket = openSocket.connect('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

// Socket service methods
const SocketService = {
  setUser: userInfo => socket.emit('user', userInfo),

  refreshUser: () => {
    if (AuthService.loggedIn) {
      AuthService.decodeToken().then((res) => {
        socket.emit('user', { userId: res.id, userType: res.userType });
      });
    }
  },

  clearUser: () => {
    socket.disconnect();
    socket.connect();
  },

  refreshOpenRestaurantOrders: (restaurantId) => {
    socket.emit('refreshOpenOrders', restaurantId);
  },

  closeOrder: (orderId, customerId, restaurantId) => new Promise((resolve, reject) => {
    socket.emit('closeOrder', orderId, customerId, restaurantId, (res, err) => {
      if (err) {
        reject(err);
      }
      store.dispatch(refreshOpenOrders(res));
      resolve(res);
    });
  }),

  submitOrder: order => new Promise((resolve, reject) => {
    socket.emit('submitOrder', order, (res, err) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  }),
};

// Socket service event listeners
socket.on('connect', () => {
  SocketService.refreshUser();
});

socket.on('disconnect', () => {
  socket.connect();
});

socket.on('foodReady', (orderId, customerId) => {
  // store.dispatch(updateOrder(orderId));
  ApiService.retrieveOrders(customerId)
    .then((res) => {
      store.dispatch(loadOrders(res));
    });
  store.dispatch(addNotification(orderId));
});

socket.on('refreshOpenOrders', (data) => {
  store.dispatch(refreshOpenOrders(data));
});

export default SocketService;
