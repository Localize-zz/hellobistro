// Import dependencies
import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import '../../styles/RestaurantNav.css';

//
export default class RestaurantNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandMenu: true,
    };

    // Bind functions in constructor
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  handleLogOut() {
    AuthService.logout();
    this.props.history.push('/restaurant/login');
    this.props.logOut();
  }

  handleMenuToggle() {
    this.setState({
      expandMenu: !this.state.expandMenu,
    });
  }

  renderMenu() {
    if (this.state.expandMenu) {
      return (
        <div>
          <ul className="link-list">
            <NavLink activeClassName="activeLink" to="/restaurant/home/dashboard">
              <li>
                <i className="material-icons">dashboard</i>Dashboard
              </li>
            </NavLink>
            <NavLink activeClassName="activeLink" to="/restaurant/home/menuManager">
              <li>
                <i className="material-icons">restaurant_menu</i>Menu Manager
              </li>
            </NavLink>
            <NavLink activeClassName="activeLink" to="/restaurant/home/orderManager">
              <li>
                <i className="material-icons">assignment</i>Orders Manager
              </li>
            </NavLink>
            <NavLink activeClassName="activeLink" to="/restaurant/home/settings">
              <li>
                <i className="material-icons">settings</i>Settings
              </li>
            </NavLink>
            <NavLink activeClassName="activeLink" to="/restaurant/home/customers">
              <li>
                <i className="material-icons">people</i>Customers
              </li>
            </NavLink>
            <li className="link-log-out" onClick={this.handleLogOut}>
              <i className="material-icons">exit_to_app</i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="RestaurantNav">
        <div className="menu-control" onClick={this.handleMenuToggle}>
          <i className="material-icons">menu</i>
        </div>
        {this.renderMenu()}
      </div>
    );
  }
}
