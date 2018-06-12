// Require controllers
const restaurantController = require('../controllers/restaurantController');
const customerController = require('../controllers/customerController');
const analyticsController = require('../controllers/analyticsController');

// Create a router object
const routes = require('express').Router();

/* **************** */
/* ANALYTICS ROUTES */
/* **************** */

routes.get('/data/:id/', (req, res) => {
  analyticsController.fetchData(req, res);
});

routes.get('/data/customers/:RestaurantId/:CustomerId/', (req, res) => {
  restaurantController.fetchUserDataForWidget(req, res);
});

/* *************** */
/* CUSTOMER ROUTES */
/* *************** */

/* Authenticate */
// Login a customer
routes.post('/login/customers', (req, res) => {
  customerController.loginCustomer(req, res);
});

/* Create */

// Create a new customer
routes.post('/register/customers', async (req, res) => {
  customerController.createCustomer(req, res);
});

// Create a new order by a customer
routes.post('/customers/:customer_id/orders', (req, res) => {
  customerController.createOrder(req, res);
});

// Add a new payment methd for a customer
routes.post('/customers/payments', (req, res) => {
  customerController.addPaymentMethod(req, res);
});

// Create a new rating by a customer
routes.put('/customers/:customer_id/ratings/:menu_item_id', (req, res) => {
  customerController.incrementRating(req, res);
});

/* Read */

// Retrieve nearby restaurants
routes.get('/customers/view', (req, res) => {
  customerController.getAllRestaurants(req, res);
});

// Retrieve a single restaurant
routes.get('/customers/view/:id', (req, res) => {
  customerController.getSingleRestaurant(req, res);
});

// Retrieve all customers
routes.get('/customers', (req, res) => {
  customerController.getAllCustomers(req, res);
});

// Retrieve all orders for a single customer
routes.get('/customers/:customer_id/orders', (req, res) => {
  customerController.getAllOrdersForCustomer(req, res);
});

// Retrieve a single customer
routes.get('/customers/:customer_id', (req, res) => {
  customerController.getSingleCustomer(req, res);
});


// Retrieve all orders for all customers
routes.get('/customers/orders', (req, res) => {
  customerController.getAllOrders(req, res);
});

// Retrieve all ratings for a customer
routes.get('/customers/:customer_id/ratings', (req, res) => {
  customerController.getRatingsForCustomer(req, res);
});

// Retrieve all payment methods ofr a customer
routes.get('/customers/payments/:customer_id/', (req, res) => {
  customerController.getPaymentMethods(req, res);
});

// Retrieve all restaurants for a specific customer
// NOTE: Consider deprecating
// routes.get('/customers/:customer_id/restaurants', (req, res) => {
//   // implement
//   // point to same controller for GET to restaurants
// });

/* Update */

// Update a customer profile
routes.patch('/customers/:customer_id/profile', (req, res) => {
  customerController.updateCustomerProfile(req, res);
});

/* Destroy */

// Delete payment method
routes.delete('/customers/payments/:payment_id/', (req, res) => {
  customerController.deletePaymentMethod(req, res);
});

// Delete customer account
routes.delete('/customers/:customer_id', (req, res) => {
  customerController.deleteCustomer(req, res);
});

/* ********************** */
/* RESTAURANT USER ROUTES */
/* ********************** */

// TO BE IMPLEMENTED

/* ***************** */
/* RESTAURANT ROUTES */
/* ***************** */

/* Authenticate */

// Create restaurant User
// routes.post('/restaurantUser', (req, res) => {
//   restaurantController.createRestaurantUser(req, res);
// });

// Login a restaurant
routes.post('/login/restaurants', (req, res) => {
  restaurantController.loginRestaurant(req, res);
});

/* Create */
// Create a new restaurant and user
routes.post('/register/restaurants', (req, res) => {
  restaurantController.createRestaurant(req, res);
});

// Create a new menu item for a restaurant
routes.post('/restaurants/menu/:restaurant_id', (req, res) => {
  restaurantController.createMenuItem(req, res);
});

// Create a new menu section for a restaurant
routes.post('/restaurants/section/:restaurant_id', (req, res) => {
  restaurantController.createMenuSection(req, res);
});

/* Read */

// Retrieve all restaurants
routes.get('/restaurants', (req, res) => {
  restaurantController.getAllRestaurants(req, res);
});

// Retrieve all open orders for a restaurant
routes.get('/restaurants/:restaurant_id/orders/open', (req, res) => {
  restaurantController.getAllOpenOrdersForRestaurant(req, res);
});

// Retrieve all historical orders for a restaurant
routes.get('/restaurants/:restaurant_id/orders', (req, res) => {
  restaurantController.getAllOrdersForRestaurant(req, res);
});

// Retrieve all ratings for a restaurant
routes.get('/restaurants/:restaurant_id/ratings', (req, res) => {
  // Consider whether needed or deprecate
  // Currently, GET to /restaurant/:id returns whole menu w/ ratings
});

// Retrieve a single restaurant
routes.get('/restaurants/:id', (req, res) => {
  restaurantController.getSingleRestaurant(req, res);
});

/* Update */

// Update a restaurant profile/settings
routes.put('/restaurants/:restaurant_id', (req, res) => {
  restaurantController.updateRestaurant(req, res);
});

// Update a menu item for a restaurant
routes.patch('/restaurants/:restaurant_id/menu/:item_id', (req, res) => {
  restaurantController.updateMenuItem(req, res);
});

routes.patch('/restaurants/menusection/:restaurant_id/:section_id', (req, res) => {
  restaurantController.updateMenuSection(req, res);
});

routes.patch('/restaurants/openorder/:OrderId/:CustomerId', (req, res) => {
  restaurantController.completeOpenOrder(req, res);
});

/* Destroy */

// Delete a restaurant account
routes.delete('/restaurants/:restaurant_id', (req, res) => {
  restaurantController.deleteRestaurant(req, res);
});

// Delete an open order for a restaurant
routes.delete('/restaurants/:restaurant_id/openorders/:order_id', (req, res) => {
  restaurantController.deleteOrder(req, res);
});

// Delete all menuSections and menuItems for a restaurant
routes.delete('/restaurants/sections/items/:restaurant_id', (req, res) => {
  restaurantController.deleteAllMenuSectionsAndItems(req, res);
});

// Delete a menu section
routes.delete('/restaurants/menusection/:section_id', (req, res) => {
  restaurantController.deleteMenuSection(req, res);
});

/* ********** */
/* API ROUTES */
/* ********** */

/* Authenticate */

// Login an API vendor
routes.post('/api/login', (req, res) => {
  // implement
});

/* Create */

// Create a new API user
routes.post('/api/signup', (req, res) => {
  // implement
});

// Create a new order to a restaurant
routes.post('/api/restaurants/:restaurant_id/orders', (req, res) => {
  restaurantController.createNewOrder(req, res);
});

/* Read */

// Retrieve all restaurants
routes.get('/api/restaurants', (req, res) => {
  restaurantController.getAllRestaurants(req, res);
});

// Retrieve information for specific restaurant
routes.get('/api/restaurants/:restaurant_id', (req, res) => {
  restaurantController.getSingleRestaurant(req, res);
});

// Retrieve past orders from vendor for specific restaurant
routes.get('/api/:user_id/restaurants/:restaurant_id/orders', (req, res) => {
  restaurantController.getAllOrdersForRestaurant(req, res);
});

/* Update */

// Update an API user account
routes.patch('/api/:user_id', (req, res) => {
  // implement
});

/* Destroy */

// Retrieve an API user account
routes.delete('/api/:user_id', (req, res) => {
  // implement
});

// upload photo
routes.post('/upload/:item_id', (req, res) => {
  restaurantController.uploadPhoto(req, res);
});


// get closest restaurants
routes.get('/customers/restaurantList/:lat/:lng', (req, res) => {
  restaurantController.closestRestaurants(req, res);
});

// delete photo
routes.delete('/restaurants/photo', (req, res) => {
  restaurantController.deletePhoto(req, res);
});

module.exports = routes;
