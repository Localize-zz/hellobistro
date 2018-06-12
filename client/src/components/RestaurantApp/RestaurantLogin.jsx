// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../services/AuthService';

// Import CSS
import '../../styles/RestaurantLogin.css';
import Mast from './Mast';

// Used by Restaurant Users to log into app
class RestaurantLogin extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
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
    AuthService.restaurantLogin(this.state.email, this.state.password)
      .then((res) => {
        this.setState({ error: false });
        const { userId, userName, restaurantInfo } = res;
        this.props.addUser(userId, userName);
        this.props.addRestaurant(restaurantInfo);
      })
      .then(() => {
        this.props.history.replace('/restaurant/home/dashboard');
      })
      .catch((err) => {
        this.setState({ error: true });
        console.error('err in handlesubmit', err);
      });
  }

  handleCreateAcc(e) {
    e.preventDefault();
    this.props.history.replace('/restaurant/userRegister');
  }

  render() {
    return (
      <div className="RestaurantLogin">
        <Mast primaryText="HelloBistro for Restaurants" />
        <div className="rest-background">
          <div className="restaurant-login-form">
            <div className="restaurant-login-form-section">
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
              <button className="register-button" onClick={this.handleCreateAcc.bind(this)}>
                Create Account
              </button>
            </div>
            {this.state.error ? <div>Invalid credentials</div> : <div />}
          </div>
        </div>
        <div className="switch-customer">
          <Link to="/customer/login">
            <i className="material-icons">people</i>HelloBistro for Hungry People
          </Link>
        </div>
      </div>
    );
  }
}

export default RestaurantLogin;
