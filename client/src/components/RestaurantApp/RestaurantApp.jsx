// Import dependencies
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// Import components/containers
import RestaurantNav from './RestaurantNav';
import CustomerList from './CustomerList';
import Mast from './Mast';
import {
  RestaurantLoginContainer,
  DashBoardContainer,
  MenuManagerContainer,
  RestaurantRegisterContainer,
  RestaurantSettingsContainer,
  OrderManagerContainer,
  CustomerListContainer,
} from '../Containers';

import AuthService from '../../services/AuthService';
import ApiService from '../../services/ApiService';

import '../../styles/RestaurantApp.css';

class RestaurantApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ApiService.getRestaurantData(this.props.state.restaurant.restaurantInfo.id)
      .then((data) => {
        // Update restaurant information upon mount, only if different
        if (
          this.props.state.restaurant.restaurantInfo.updatedAt !==
          data.updatedAt
        ) {
          this.props.updateRestaurantData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // ApiService.getAnalytics(this.props.state.restaurant.restaurantInfo.id).then((data) => {
    ApiService.getAnalytics(this.props.state.restaurant.restaurantInfo.id)
      .then((data) => {
        // If no analytics data loaded, fetch it
        if (!this.props.state.restaurant.analytics.totalRevenue) {
          this.props.updateAnalyticsData(data);
        }

        // Update analytics information upon mount, only if different
        if (
          this.props.state.restaurant.analytics.totalRevenue !==
          data.totalRevenue
        ) {
          this.props.updateAnalyticsData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    AuthService.logout();
    this.props.history.replace('/');
  }

  render() {
    return (
      <div className="RestaurantApp">
        <div className="sidebar-left">
          <Mast />
          <RestaurantNav {...this.props} />
        </div>
        <main>
          <div className="small-screen">
            <Mast />
            <RestaurantNav {...this.props} />
          </div>
          <Switch>
            <Route path="/restaurant/home/register" component={RestaurantRegisterContainer} />
            <Route path="/restaurant/home/dashboard" component={DashBoardContainer} />
            <Route path="/restaurant/home/menuManager" component={MenuManagerContainer} />
            <Route path="/restaurant/home/orderManager" component={OrderManagerContainer} />
            <Route path="/restaurant/home/customers" component={CustomerListContainer} />
            <Route path="/restaurant/home/settings" component={RestaurantSettingsContainer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default RestaurantApp;
