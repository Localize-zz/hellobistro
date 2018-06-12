import React from 'react';
import { CardElement } from 'react-stripe-elements';

export const CardSection = () => (
  <label className="CardSection">
    <CardElement style={{ base: { fontSize: '18px' } }} />
  </label>
);

export default CardSection;
