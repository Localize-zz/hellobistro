// Import dependencies
import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import Mast from './Mast';
import '../../styles/RestaurantRegister.css';
import 'babel-polyfill';

class RestaurantRegister extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      passwordMatch: true,
      validEmail: true,
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkFields() {
    const {
      password, confirmpassword, email, username,
    } = this.state;
    this.setState({
      passwordMatch: password.length > 0 && password === confirmpassword,
      validEmail: this.validateEmail(email),
    });
  }

  async validFields() {
    const check = await this.checkFields.call(this);
    return this.state.passwordMatch && this.state.validEmail;
  }

  registerRestaurantUser(e) {
    e.preventDefault();
    const {
      email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type,
    } = this.state;
    this.setState({ error: false }, async () => {
      const check = await this.validFields.call(this);
      if (check) {
        AuthService.restaurantRegister(email, password, phone, name, addressOne, addressTwo, addressCity, addressState, addressZip, description, genre, type)
          .then((res) => {
            this.setState({ error: false });
            this.props.history.replace('/restaurant/login');
          })
          .catch((error) => {
            console.log('error registering restaurant', error);
            error.response.json().then((err) => {
              this.setState({ error: err.error });
            });
          });
      }
    });
  }

  render() {
    return (
      <div className="RestaurantUserRegister">


        <Mast primaryText="HelloBistro for Restaurants" />

        <div className="mock-form">
          <div className="form-section">
            <div className="form-section-header">
      Register your restaurant (* fields are required)
    </div>

            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="email"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Email *</span>
    </div>

            <div className="user-input-wrp pw-wrp">
      <br />
      <input
        className="inputText"
        name="password"
        defaultValue={null}
        type="password"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Password *</span>
    </div>

            <div className="user-input-wrp pw-wrp">
      <br />
      <input
        className="inputText"
        name="confirmpassword"
        defaultValue={null}
        type="password"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Re-enter Password *</span>
    </div>


            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="phone"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Phone *</span>
    </div>


            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="name"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Name *</span>
    </div>


            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="addressOne"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Address (1) *</span>
    </div>

            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="addressTwo"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Address (2)</span>
    </div>


            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="addressCity"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">City *</span>
    </div>

            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="addressState"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">State *</span>
    </div>

            <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="addressZip"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Zip Code *</span>
    </div>
          <div className="form-group">
            <label className="label-description" htmlFor="description">&nbsp; &nbsp; Description</label>
            <textarea className="form-input form-input-txtarea" name="description" placeholder="Enter Description Here" onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="genre"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">"Genre (e.g., Mexican, New American...)"</span>
    </div>
      <div className="user-input-wrp">
      <br />
      <input
        className="inputText"
        name="type"
        defaultValue={null}
        type="text"
        onChange={this.handleChange.bind(this)}
        required
      />
      <span className="floating-label">Type (e.g., Bar, Restaurant)</span>
    </div>
            <br />
            {
            this.state.error
            ? <div className="error">{this.state.error}</div>
            : <div />
          }
            {
            this.state.passwordMatch === false
            ? <div className="error">Passwords do not match </div>
            : <div />
          }
            {
            this.state.validEmail === false
            ? <div className="error">Not a valid email </div>
            : <div />
          }
          <button className="register-submit" onClick={this.registerRestaurantUser.bind(this)}>Register</button>
      </div>
      </div>
      </div>
    );
  }
}

export default RestaurantRegister;
