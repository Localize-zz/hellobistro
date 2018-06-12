import React from 'react';
import ApiService from '../../services/ApiService';
import '../../styles/Modals.css';

class WidgetUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const { data } = this.props.state.modals;
    ApiService.fetchUserWidgetData(this.props.state.restaurant.restaurantInfo.id, data.customerId)
      .then(res => this.setState({ orders: res }));
  }

  render() {
    const orders = this.state.orders.length >= 1 ? this.state.orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.createdAt}</td><td>${order.total}</td></tr>) : null;
    const table = this.state.orders.length >= 1 ? <table className="widget-modal-table"><thead><tr><th>Order Id</th><th>Date</th><th>Bill</th></tr></thead><tbody>{orders}</tbody></table> : <div className="modal-loader" />;
    const { data } = this.props.state.modals;
    return (
      <div className="widget-modal user">
        <div className="widget-modal-header user">
          <i className="material-icons modal">person_pin</i>
          <h3 className="widget-modal-title">Customer Details</h3>
        </div>
        <div className="widget-modal-content user">
          <h3>{data.userName}'s orders:</h3>
          {table}
          <button onClick={this.props.modalOff} >Close</button>
        </div>
      </div>
    );
  }
}

export default WidgetUserModal;
