// Import dependencies
import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

import decode from 'jwt-decode';

import '../../styles/CustomerLogin.css';
import Mast from './Mast';

// import { history } from '../../store';
import { withRouter, Link } from 'react-router-dom';

const jwt = require('jsonwebtoken');
// CustomerLogin component
// Used by Customers to log into app
class CustomerLogin extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  componentWillMount() {
    const token = AuthService.getToken();
    const decoded = jwt.decode(token, { complete: true });
    if (token) {
      if (decoded.payload.userType === 'Customer') {
        this.props.history.replace('/customer/home/findRestaurants');
      } else if (decoded.payload.userType === 'Restaurant') {
        this.props.history.replace('/restaurant/home');
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    AuthService.login(this.state.email, this.state.password)
      .then((res) => {
        delete res.token;
        this.props.loadCustomerUser(res);
        this.setState({ error: false });
        this.props.history.replace('/customer/home/findRestaurants');
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  handleCreate(e) {
    e.preventDefault();
    this.props.history.replace('/customer/register');
  }

  render() {
    return (
      <div className="CustomerLogin">
        <div className="customer-login-mast">
          <span>HelloBistro</span>
        </div>
        <div className="background">
          <div className="customer-login-form">
            <div className="customer-login-form-section">
              <div className="form-section-header" />
              <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="text"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <button className="login-button" onClick={this.handleLogin.bind(this)}>LOGIN</button>
              <button className="register-button" onClick={this.handleCreate.bind(this)}>
                Create Account
              </button>
            </div>
            {this.state.error ? <div>Invalid credentials</div> : <div />}
          </div>
        </div>
        <div className="switch-restaurant">
          <Link to="/restaurant/login">
            <i className="material-icons">store</i>HelloBistro for Restaurants
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomerLogin);
