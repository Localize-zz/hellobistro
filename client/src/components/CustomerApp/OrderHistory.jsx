// Import dependencies
import React from 'react';
import moment from 'moment';
import ApiService from '../../services/ApiService';
import OrderHistoryItem from './OrderHistoryItem';
import OrderHistoryCompleted from './OrderHistoryCompleted';
// Import style
import '../../styles/CustomerOrderHistory.css';

// Order component
class OrderHistory extends React.Component {
  componentDidMount(props) {
    ApiService.retrieveOrders(this.props.state.user.userId)
      .then((res) => {
        this.props.loadOrders(res);
      });
  }

  render() {
    const { orders } = this.props.state.customer;

    if (!orders || !Array.isArray(orders)) {
      return (
        <div className="customer-loader" />
      );
    }

    const openOrders = orders.filter((order) => {
      return order.status === 'queued' || moment.duration(moment().diff(moment(order.completedAt))).as('hours') <= 1;
    });
    const openRender = openOrders.map(order => <OrderHistoryItem key={order.id} data={order} {...this.props} />);
    const closedOrders = orders.filter(order => order.status === 'completed' && moment.duration(moment().diff(moment(order.completedAt))).as('hours') > 1);
    const closedRender = closedOrders.map(order => <OrderHistoryCompleted data={order} key={order.id} />);

    return (
      <div className="order-history">
        <h2 className="header">Your orders.</h2>
        <div className="open">
          <h3 className="open-sub-header">Current orders:</h3>
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Order Id</th>
                <th>Restaurant</th>
                <th>Bill</th>
              </tr>
            </thead>
            {/* {openRender} */}
            {openOrders.map(order => <OrderHistoryItem key={order.id} data={order} />)}
          </table>
        </div>
        <div className="completed">
          <div className="completed-sub-header"><h3>Past orders:</h3></div>
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Date</th>
                <th>Restaurant</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody>
              {closedRender}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrderHistory;
