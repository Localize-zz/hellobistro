import React from 'react';

const OrderItem = (props) => {
  const data = props.data;
  return (
    <div className="order-item" onClick={() => {props.modalOn('orderModal', props.state.customer.cart.items[props.data.id])}}>
      <p><strong>{data.name}</strong> - Quantity: {data.quantity}</p>
      <p>Unit price: ${data.price.toFixed(2)} Total price: ${(data.price * data.quantity).toFixed(2)}</p>
      {!data.special ? null : <p>Special requests: {data.special}</p>}
    </div>
  );
};

export default OrderItem;
