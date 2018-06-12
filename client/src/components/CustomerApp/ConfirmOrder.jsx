// Import dependencies
import React from 'react';
import SocketService from '../../services/SocketService';
import '../../styles/CustomerConfirmOrder.css';

// ConfirmOrder component
// Confirm before a user places an order
const ConfirmOrder = (props) => {
  const items = Object.values(props.state.customer.cart.items);
  const billTotal = items.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2);
  const paymentMethods = props.state.user.paymentMethods.length > 0 ? props.state.user.paymentMethods.map(card => (<option key={card.id} value={card.cardId}>{card.brand} -{card.last4}</option>)) : <option>No payment methods on file.</option>;

  const handleSubmit = () => {
    const { userId, paymentId } = props.state.user;
    const CardId = props.state.customer.cart.paymentId || props.state.user.paymentMethods[0].cardId;
    const CustomerStripeId = props.state.user.paymentId;
    const RestaurantId = props.state.customer.cart.restaurantId;
    const { table } = props.state.customer.cart;
    SocketService.submitOrder({ total: billTotal, table, CustomerId: userId, StripeId: CustomerStripeId, CardId, RestaurantId, items })
      .then((res) => {
        props.clearCart();
        props.history.push('/customer/home/history');
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  const button = !props.state.customer.cart.table || props.state.user.paymentMethods.length > 0 ? <button className="place-order" onClick={handleSubmit}>Place Order</button> : <button className="order-error">Place Order</button>;

  return (
    <div className="ConfirmOrder">
      <h2>Finalize Your Order</h2>
      <h3>Bill total: ${billTotal}</h3>
      <input className="table-number" onChange={e => props.updateTable(e.target.value)} type="text" placeholder="Table #" />
      <div className="payment"><select className="select-payment" onChange={e => props.choosePayment(e.target.value)}><option>💳 Select payment method</option>{paymentMethods}</select></div>
      {button}
    </div>
  );
};

export default ConfirmOrder;
