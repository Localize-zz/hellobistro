const restaurantController = require('../controllers/restaurantController');
const customerController = require('../controllers/customerController');

let io = null;
const customerConnections = {};
const restaurantConnections = {};

exports.set = (socket) => {
  io = socket;
  io.sockets.on('connection', (connection) => {
    connection.on('user', (user) => {
      connection.user = user.userId;
      connection.userType = user.userType;

      // RESTAURANT HANDLER
      if (connection.userType === 'Restaurant') {
        restaurantConnections[user.userId] = { socket: connection };

        connection.on('disconnect', () => {
          delete restaurantConnections[connection.user];
        });

        connection.on('refreshOpenOrders', (RestaurantId) => {
          restaurantController.getOpenRestaurantOrders(RestaurantId)
            .then((orders) => {
              connection.emit('refreshOpenOrders', orders);
            });
        });

        connection.on('closeOrder', (OrderId, CustomerId, RestaurantId, acknowledgment) => {
          restaurantController.closeOrder(OrderId)
            .then(() => restaurantController.getOpenRestaurantOrders(RestaurantId))
            .then((orders) => {
              acknowledgment(orders, null);
            })
            .then(() => {
              connection.to(customerConnections[CustomerId].socket.id).emit('foodReady', OrderId, CustomerId);
            })
            .catch((error) => {
              console.log('error closing order', error);
              acknowledgment(null, error);
            });
        });
      }

      // CUSTOMER HANDLER
      if (connection.userType === 'Customer') {
        customerConnections[user.userId] = { socket: connection };
        connection.on('disconnect', () => {
          delete customerConnections[connection.user];
        });

        connection.on('submitOrder', (order, acknowledgment) => {
          customerController.submitOrder(order)
            .then(() => {
              acknowledgment('Success', null);
            })
            .catch((err) => {
              console.log('error creating order', err);
              acknowledgment(null, err);
            })
            .then(() => restaurantController.getOpenRestaurantOrders(order.RestaurantId))
            .then((orders) => {
              connection.to(restaurantConnections[order.RestaurantId].socket.id).emit('refreshOpenOrders', orders);
            })
            .catch((err) => {
              console.log('Error updating Order Manager', err);
            });
        });
      }
    });
  });
};

exports.get = () => io;

exports.customerConnections = customerConnections;
exports.restaurantConnections = restaurantConnections;
