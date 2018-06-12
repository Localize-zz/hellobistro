// Import dependencies
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import '../../styles/CustomerNav.css';

//
export default class CustomerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandMenu: true,
    };

    // Bind functions in constructor
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    AuthService.logout();
    this.props.history.push('/');
    this.props.logOut();
  }

  renderMenu() {
    if (this.props.state.ui.navVisible || !this.props.small) {
      return (
        <div className="link-list-container">
          <ul className="link-list">
            <li onClick={this.props.toggleNav}><Link to="/customer/home/findRestaurants"><i className="material-icons">location_on</i>Find Restaurants</Link></li>
            <li onClick={this.props.toggleNav}><Link to="/customer/home/order"><i className="material-icons">list</i>Your Cart</Link></li>
            <li onClick={this.props.toggleNav}><Link to="/customer/home/history"><i className="material-icons">dashboard</i>Your Orders</Link></li>
            <li onClick={this.props.toggleNav}><Link to="/customer/home/favorites"><i className="material-icons">favorite</i>Favorites</Link></li>
            <li onClick={this.props.toggleNav}><Link to="/customer/home/payment"><i className="material-icons">credit_card</i>Payment Methods</Link></li>
            <li onClick={this.props.toggleNav}><Link to="/customer/home/settings"><i className="material-icons">settings</i><span>Settings</span></Link></li>
            <li className="link-log-out" onClick={this.handleLogOut}>
              <i className="material-icons">exit_to_app</i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      );
    }
    
    return (
        <div />
    );
  }

  render() {
    return (
      <div className="CustomerNav">
        { this.renderMenu() }
      </div>
    );
  }
}
