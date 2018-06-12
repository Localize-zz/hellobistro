// Import dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { OrderItemContainer } from '../Containers';
import '../../styles/CustomerOrder.css';

// Order component
class CustomerOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: null,
    };
  }

  render() {
    // If cart is empty:
    if (Object.values(this.props.state.customer.cart.items).length < 1) {
      return (
        <div className="order">
          <h2 id="header">Your Cart:</h2>
          <h4 id="sub-header">Your cart is currently empty.</h4>
        </div>
      );
    }

    // If cart has items in it: 
    const items = Object.values(this.props.state.customer.cart.items);
    const billTotal = items.reduce((a, b) =>
      a + (b.price * b.quantity), 0);
    const renderItems = items.map(item => <OrderItemContainer key={item.id} data={item} toggle={this.toggleModal} />);

    return (
      <div className="order DebugComponentRed">
        <h2 id="header">Your Cart:</h2>
        {renderItems}
        <p id="total"><strong>Bill total:</strong> ${billTotal.toFixed(2)}</p>
        <Link to='/customer/home/confirm-order/'><button className="place-order">Place order</button></Link><button className="clear-cart" onClick={this.props.clearCart}>Cancel order</button>
      </div>
    );
  }
};

export default CustomerOrder;
