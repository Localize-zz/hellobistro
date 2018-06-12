import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedAddPayment from './AddPayment';
import PaymentItem from './PaymentItem';
import ApiService from '../../services/ApiService';
import '../../styles/CustomerPayments.css';


const PaymentMethods = (props) => {
  // Function to delete cards.
  const removeCard = (cardId) => {
    ApiService.deletePaymentMethod(cardId)
      .then(() => {
        ApiService.retrievePaymentMethods(props.state.user.userId)
          .then((response) => {
            props.updatePaymentMethods(response);
          });
      });
  };
  const cards = props.state.user.paymentMethods.length > 0 ? <div><h3>We have the following cards on file:</h3><div className="payment-list">{props.state.user.paymentMethods.map(card => <PaymentItem key={card.id} data={card} removeCard={removeCard} />)}</div></div> : null;
  return (
    <div className="payment-methods">
      <h2>Manage your payment methods</h2>
      {cards}
      <StripeProvider apiKey="pk_test_lEspx1Lvu5kruar7NCjsiA4x">
        <Elements>
          <InjectedAddPayment userId={props.state.user.userId} stripeId={props.state.user.paymentId} update={props.updatePaymentMethods} />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default PaymentMethods;
