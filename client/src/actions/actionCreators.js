export function increment() {
  return {
    type: 'INCREMENT_LIKES',
  };
}

export function logOut(data) {
  return {
    type: 'USER_LOGOUT',
    data,
  };
}

// CUSTOMER APP ACTIONS

export function toggleNav() {
  return {
    type: 'TOGGLE_NAV',
  };
}

export function addCustomer(obj) {
  obj.type = 'ADD_CUSTOMER';
  return obj;
}

export function loadRestaurantList(data) {
  return {
    type: 'LOAD_RESTAURANT_LIST',
    data,
  };
}

export function loadSelectedRestaurant(data) {
  return {
    type: 'LOAD_SELECTED_RESTAURANT',
    data,
  };
}

export function loadClosestRestaurantList(data) {
  return {
    type: 'LOAD_CLOSEST_RESTAURANT_LIST',
    data,
  };
}

export function addToCart(data) {
  return {
    type: 'ADD_TO_CART',
    data,
  };
}

export function editCartItem(id, key, value) {
  return {
    type: 'EDIT_CART_ITEM',
    id,
    key,
    value,
  };
}

export function deleteCartItem(id) {
  return {
    type: 'DELETE_CART_ITEM',
    id,
  };
}

export function clearCart() {
  return {
    type: 'CLEAR_CART',
  };
}

export function updateTable(tableNumber) {
  return {
    type: 'UPDATE_TABLE',
    tableNumber,
  };
}

export function choosePayment(paymentId) {
  return {
    type: 'CHOOSE_PAYMENT',
    paymentId,
  };
}

export function loadCustomerUser(data) {
  return {
    type: 'LOAD_CUSTOMER',
    data,
  };
}

export function setCartRestaurant(id) {
  return {
    type: 'SET_CART_RESTAURANT',
    id,
  };
}

export function loadOrders(data) {
  return {
    type: 'LOAD_ORDERS',
    data,
  };
}

export function updateOrder(orderId) {
  return {
    type: 'UPDATE_ORDER',
    orderId,
  };
}

export function updatePaymentMethods(data) {
  return {
    type: 'UPDATE_PAYMENT_METHODS',
    data,
  };
}

export function setCustomerLocation(lat, long){
  return{
    type: 'SET_CUSTOMER_LOCATION',
    lat,
    long,
  }
}

// RESTAURANT APP ACTIONS

export function loadRestaurantData(data) {
  return {
    type: 'LOAD_RESTAURANT_DATA',
    data,
  };
}

export function updateRestaurantData(data) {
  return {
    type: 'UPDATE_RESTAURANT_DATA',
    data,
  };
}

export function updateAnalyticsData(data) {
  return {
    type: 'UPDATE_ANALYTICS_DATA',
    data,
  };
}

export function addRestaurant(data) {
  return {
    type: 'ADD_RESTAURANT',
    data
  }
}

export function addUser(userId, userName) {
  return {
    type: 'ADD_USER',
    data: {
      userId,
      userName,
    },
  };
}

export function addOrders(data) {
  return {
    type: 'ADD_ORDERS',
    data,
  };
}

export function modalOn(id, data) {
  return {
    type: 'MODAL_ON',
    id,
    data,
  };
}

export function modalOff() {
  return {
    type: 'MODAL_OFF',
  };
}

export function addNotification(data) {
  return {
    type: 'ADD_NOTIFICATION',
    data,
  };
}

export function clearNotification() {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
}

export function refreshOpenOrders(data) {
  return {
    type: 'REFRESH_OPEN_ORDERS',
    data,
  };
}
