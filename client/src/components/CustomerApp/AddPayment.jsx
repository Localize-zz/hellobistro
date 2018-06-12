import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection';
import ApiService from '../../services/ApiService';

export class AddPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardError: false };
  }

  cancelError = () => {
    if (this.state.cardError === true) {
      this.setState({ cardError: false })
    }
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken().then((response) => {
      if (response.error) {
        console.log('stripe error', response)
        this.setState({ cardError: true });
      } else {
        const stripeId = this.props.stripeId;
        ApiService.addPaymentMethod({
          StripeId: this.props.stripeId,
          CustomerId: this.props.userId, 
          token: response,
        })
        .then((res) => {
          ApiService.retrievePaymentMethods(this.props.userId)
          .then((response) => {
            this.props.update(response);
          })
        })
        .catch((error) => {
        console.log('stripe error', error)
        this.setState({ cardError: true });
        })
      }  
    });
  }

  render() {
    return (
        <form className="AddPayment" onSubmit={this.handleSubmit} onClick={this.cancelError}>
        <h3>Add a new payment method:</h3>
          <div className="add-payment">
            <CardSection />
            {this.state.cardError === true ? <p>Sorry, we were unable to approve this card.</p> : null}
          </div>
          <button className="add-button"><i className="material-icons">add_box</i>Save card.</button>
        </form>
    );
  }
}

export default injectStripe(AddPayment);