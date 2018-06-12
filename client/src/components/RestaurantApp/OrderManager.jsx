// Import dependencies
import React from "react";
import ApiService from "../../services/ApiService";
import SocketService from "../../services/SocketService";
import OrderTimer from "./OrderTimer";
import moment from "moment";
import "../../styles/RestaurantOrderManager.css";

class OrderManager extends React.Component {
  constructor(props) {
    super(props);
  }

  closeOrder = (orderId, customerId) => {
    const restaurantId = this.props.state.restaurant.restaurantInfo.id;
    SocketService.closeOrder(orderId, customerId, restaurantId).catch(err => {
      console.log("Error closing order", err);
    });
  };

  componentDidMount() {
    const restaurantId = this.props.state.restaurant.restaurantInfo.id;
    SocketService.refreshOpenRestaurantOrders(restaurantId);
  }

  render() {
    const orderItem = this.props.state.restaurant.data.openOrders.map(
      (order, i) => (
        <div key={i} className="open-order">
          <div className="open-order-header">
            <h3>Order # {order.id} (table: {order.table})</h3>
            <OrderTimer order={order} />
          </div>
          {order.MenuItems.map((item, i) => (
            <div key={i} className="open-order-item">
              <input type="checkbox" className="order-item-box" />
              <div className="order-item-name">{item.name} {item.OrderItem.quantity > 1 ? <strong> x {item.OrderItem.quantity}</strong> : null}</div>
              {item.OrderItem.special ? (
                <div>
                  <i>Special Request: {item.OrderItem.special}</i>
                </div>
              ) : null}
            </div>
          ))}
          <button
            className="complete-open-order"
            onClick={() => this.closeOrder(order.id, order.CustomerId)}
          >
            Complete Order
          </button>
        </div>
      )
    );

    return (
      <div className="order-manager">
        <div className="page-header">
          Manage the orders for{" "}
          <strong>{this.props.state.restaurant.restaurantInfo.name}:</strong>
        </div>
        {this.props.state.restaurant.data.openOrders.length > 0 ? (
          orderItem
        ) : (
          <div>
            <h3>The queue is empty.</h3>
            <h4>Listening for new orders.</h4>
            <div className="restaurant-loader" />
          </div>
        )}
      </div>
    );
  }
}

export default OrderManager;
