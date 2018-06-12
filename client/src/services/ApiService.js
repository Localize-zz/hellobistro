// Import sibling services
import AuthService from './AuthService';

// Declare variables
const domain = 'http://localhost:3000';

// Declare ApiService object
const ApiService = {
  async getRestaurantData(id) {
    return AuthService.fetch(`/restaurants/${id}`);
  },

  getMenuData: id => AuthService.fetch(`/customers/view/${id}`),

  getAnalytics: id => AuthService.fetch(`/data/${id}`),

  getUserLikes: id => AuthService.fetch(`/customers/${id}/ratings`),

  incrementRating: (customerId, itemId) => AuthService.fetch(`/customers/${customerId}/ratings/${itemId}`, { method: 'PUT' }),

  updateRestaurant(info, formValues) {
    return AuthService.fetch(`/restaurants/${info.id}`, {
      method: 'PUT',
      body: {
        formValues, 
        info,
      }
    });
  },

  removeOldMenu: id => AuthService.fetch(`/restaurants/sections/items/${id}`, { method: 'DELETE' }),

  addNewMenuSection: (id, name, description) => AuthService.fetch(`/restaurants/section/${id}`, {
    method: 'POST',
    body: {
      name,
      description,
    },
  }),

  addNewMenuItem: (
    id,
    name,
    description,
    price,
    vegan,
    vegetarian,
    glutenFree,
    spicy,
    image,
    prepTime,
    rating,
    status,
    menuSectionId,
  ) => AuthService.fetch(`/restaurants/menu/${id}`, {
    method: 'POST',
    body: {
      name,
      price,
      vegan,
      vegetarian,
      glutenFree,
      spicy,
      image,
      prepTime,
      rating,
      status,
      menuSectionId,
    },
  }),

  getOpenOrdersForRestaurant: id => AuthService.fetch(`/restaurants/${id}/orders/open`, { method: 'GET' }),

  completeOpenOrder: (orderId, customerId) => fetch(`${domain}/restaurants/openorder/${orderId}/${customerId}`, { method: 'PATCH' }),

  // submitOrder: orderData => AuthService.fetch(`/customers/${orderData.CustomerId}/orders`, { method: 'POST', body: orderData }),

  findRestaurants: () => AuthService.fetch('/customers/view', { method: 'GET' }),

  getCustomerProfile: id => AuthService.fetch(`/customers/${id}`, { method: 'GET' }),

  updateCustomerProfile: (
    id,
    userName,
    email,
    firstName,
    lastName,
    phone,
    originalEmail,
    password,
  ) =>
    AuthService.fetch(`/customers/${id}/profile`, {
      method: 'PATCH',
      body: {
        email,
        userName,
        firstName,
        lastName,
        phone,
        password,
        originalEmail,
      },
    }),

  retrieveOrders: id => AuthService.fetch(`/customers/${id}/orders`, { method: 'GET' }),

  addPaymentMethod: dataObject => AuthService.fetch('/customers/payments', { method: 'POST', body: dataObject }),

  //patch('/restaurants/:restaurant_id/menu/:item_id'

  updateMenuItem: (restaurantId, itemId, info) => AuthService.fetch(`/restaurants/${restaurantId}/menu/${itemId}`, { method: 'PATCH', body: info }),

  updateMenuSection: (restaurantId, info, menuSection) => AuthService.fetch(`/restaurants/menusection/${restaurantId}/${menuSection}`, { method: 'PATCH', body: info }),

  deleteMenuSection: menuSection => AuthService.fetch(`/restaurants/menusection/${menuSection}`, { method: 'DELETE' }),

  deletePhoto: imageKey => AuthService.fetch('/restaurants/photo', { method: 'DELETE', body: { imageKey } }),

  fetchUserWidgetData: (restaurantId, customerId) => AuthService.fetch(`/data/customers/${restaurantId}/${customerId}`, { method: 'GET' }),

  retrievePaymentMethods: id => AuthService.fetch(`/customers/payments/${id}`, { method: 'GET' }),

  deletePaymentMethod: paymentId => AuthService.fetch(`/customers/payments/${paymentId}`, { method: 'DELETE' }),

  getRestaurantList: (lat, lng) => AuthService.fetch(`/customers/restaurantList/${lat}/${lng}`, { method: 'GET' }),

};

export default ApiService;
