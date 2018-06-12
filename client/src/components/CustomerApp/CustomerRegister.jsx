// Import dependencies
import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import Mast from './Mast';

require('babel-polyfill');

class CustomerRegister extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      passwordMatch: true,
      validEmail: true,
      validUsername: true,
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkFields() {
    const {
 password, verifypassword, email, username 
} = this.state;
    this.setState({
      passwordMatch: password.length > 0 && password === verifypassword,
      validEmail: this.validateEmail(email),
      validUsername: !!username,
    });
  }

  async validFields() {
    let check = await this.checkFields.call(this);
    return (
      this.state.username && this.state.passwordMatch && this.state.validEmail
    );
  }

  async registerCustomer(e) {
    e.preventDefault();
    const {
      username,
      firstname,
      lastname,
      password,
      verifypassword,
      zip,
      phone,
      email,
    } = this.state;
    let check = await this.validFields.call(this);
    if (check) {
      AuthService.customerRegister(
        username,
        firstname,
        lastname,
        password,
        zip,
        phone,
        email,
      )
        .then((res) => {
          this.setState({ error: false });
          this.props.history.replace('/');
        })
        .catch((err) => {
          this.setState({ error: true });
          console.error('error registering customer', err);
        });
    }
  }

  render() {
    return (
      <div className="CustomerRegister">
        <Mast />

        <div className="mock-form">
          <div className="form-section">
            <div className="form-section-header">
              Create an account (* fields are required)
            </div>
            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="username"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Username *</span>
            </div>

            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="firstname"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">First Name *</span>
            </div>

            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="lastname"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Last Name *</span>
            </div>

            <div className="user-input-wrp pw-wrp">
            <br/>
              <input
                className="inputText"
                name="password"
                placeholder={null}
                type="password"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Password *</span>
            </div>

            <div className="user-input-wrp pw-wrp">
            <br/>
              <input
                className="inputText"
                name="verifypassword"
                placeholder={null}
                type="password"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Re-enter Password *</span>
            </div>

            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="zip"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Zip *</span>
            </div>

            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="phone"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Phone *</span>
            </div>

            <div className="user-input-wrp">
            <br/>
              <input
                className="inputText"
                name="email"
                placeholder={null}
                type="text"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="floating-label">Email *</span>
            </div>
            {this.state.error ? <div>Email already exists </div> : <div />}
            {this.state.passwordMatch === false ? (
              <div className='error'>Passwords do not match </div>
            ) : (
              <div />
            )}
            {this.state.validEmail === false ? (
              <div className='error'>Not a valid email </div>
            ) : (
              <div />
            )}
            {this.state.validUsername === false ? (
              <div className='error'>Please provide a username </div>
            ) : (
              <div />
            )}
            <button className="register-submit" onClick={this.registerCustomer.bind(this)}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerRegister;
