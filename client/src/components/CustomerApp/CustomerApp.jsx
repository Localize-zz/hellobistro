// Import dependencies
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// Import components
import CustomerNav from './CustomerNav';
import {
  FindRestaurantsContainer,
  FavoritesContainer,
  OrderHistoryContainer,
  OrderContainer,
  CustomerSettingsContainer,
  MenuContainer,
  ConfirmOrderContainer,
  PaymentMethodsContainer,
  CustomerNavContainer,
  MastContainer,
  NotificationsContainer,
} from '../Containers';
// Import Services
import AuthService from '../../services/AuthService';
import ApiService from '../../services/ApiService';
// Import CSS
import '../../styles/CustomerApp.css';

// Create parent application
class CustomerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    AuthService.logout();
    this.props.history.replace('/');
  }

  render() {
    const width = window.innerWidth;
    if (width > 768) {
      console.log('big window');
    }
    return (
      <div className="CustomerApp">
        <div className="sidebar-left">
          <MastContainer />
          <CustomerNav {...this.props} />
          <NotificationsContainer />
        </div>
        <main>
          <div className="small-screen-customer">
            <MastContainer />
            <CustomerNavContainer small {...this.props} />
          </div>
          <Switch>
            <Route path="/customer/home/findRestaurants" component={FindRestaurantsContainer} />
            <Route path="/customer/home/history" component={OrderHistoryContainer} />
            <Route path="/customer/home/order" component={OrderContainer} />
            <Route path="/customer/home/settings" component={CustomerSettingsContainer} />
            <Route path="/customer/home/favorites" component={FavoritesContainer} />
            <Route path="/customer/home/:id/menu" component={MenuContainer} />
            <Route path="/customer/home/confirm-order" component={ConfirmOrderContainer} />
            <Route path="/customer/home/payment" component={PaymentMethodsContainer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default CustomerApp;
