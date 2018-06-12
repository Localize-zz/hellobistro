// import dependencies
import React from 'react';
import '../../styles/CustomerPayments.css';
import ApiService from '../../services/ApiService';

const cardImages = {
  Visa: '1.png',
  MasterCard: '2.png',
  Maestro: '3.png',
  Cirrus: '4.ping',
  Discover: '14.png',
  'American Express': '22.png',
};

const PaymentItem = ({ data, removeCard }) => {
  const imgSrc = require(`../../img/card_icons/${cardImages[data.brand]}`);
  return (
    <div className="payment-item">
      <span><img className="card-icon" src={imgSrc} alt={data.brand} /> ending in {data.last4}</span><span className="card-expiration"><span className="card-expiration-tag">Expiration:{'\u00A0'}</span> {data.exp_month}/{data.exp_year}<i className="material-icons delete-card" onClick={() => {removeCard(data.id)}}>delete_forever</i></span>
    </div>
  );
};

export default PaymentItem;
