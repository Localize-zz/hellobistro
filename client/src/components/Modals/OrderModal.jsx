import React from 'react';
import '../../styles/Modals.css';

const OrderModal = (props) => {
  const { data } = props.state.modals;

  return (
    <div className="order-modal">
      <div className="order-modal-header">
        <h3><strong>{data.name}</strong> | ${data.price}</h3>
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" min="1" max="20" id="quantity" defaultValue={data.quantity} onBlur={(e) => { props.editCartItem(data.id, 'quantity', e.target.value); }} />
      </div>
      <div>
        <label htmlFor="special">Special requests:  </label>
        <textarea id="special" defaultValue={data.special} onBlur={(e) => { props.editCartItem(data.id, 'special', e.target.value); }} />
      </div>
      <div className="order-modal-buttons">
        <button className="modal-button" onClick={props.modalOff} >Add to Order</button>
        <button className="clear-button" onClick={() => { props.deleteCartItem(data.id); props.modalOff(); }} >Cancel Item</button>
      </div>
    </div>
  );
};

export default OrderModal;
