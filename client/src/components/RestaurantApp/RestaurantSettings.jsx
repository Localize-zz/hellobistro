// Import dependencies
import React from 'react';

// Import services/helpers
import ApiService from '../../services/ApiService';

// Import CSS
import '../../styles/RestaurantSettings.css';

class RestaurantSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formValues = {};
  }

  handleChange = (e) => {
    this.setState({
      formValues: Object.assign(this.state.formValues, {[e.target.name]: e.target.value})
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    ApiService.updateRestaurant(this.props.state.restaurant.restaurantInfo, this.state.formValues).then((data) => {
      this.props.updateRestaurantData(data);
    }).then(() => {
      this.setState({confirmation: true});
      window.scrollTo(0,0);
    }).catch(err => {
      err.response.json().then((errMsg) => {
        this.setState({errorMessage: errMsg.error})
      })
    });
  }

  renderConfirmation = () => {
    return (
      <p className="success">
        Restaurant/account information updated
      </p>
    );
  }

  render() {
    let info = this.props.state.restaurant.restaurantInfo;
    return(
      <div className="RestaurantSettings">
        <div className="page-header">
          <p>
            Information/Settings for{' '}
            <strong>{info.name}</strong>
          </p>
          { this.state.confirmation ? this.renderConfirmation() : <div></div>}
        </div>

        <form className="form">
          <div className="form-section">
            <div className="form-section-header">Restaurant Information</div>

            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                // cid="restaurantName"
                name="name"
                type="text"
                defaultValue={info.name}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Restaurant Name</span>
            </div>

            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="addressOne"
                name="addressOne"
                type="text"
                defaultValue={info.addressOne}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Address</span>
            </div>

            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="addressTwo"
                name="addressTwo"
                type="text"
                defaultValue={info.addressTwo}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Address (2)</span>
            </div>
            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="city"
                name="city"
                type="text"
                defaultValue={info.city}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">City</span>
            </div>
            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="state"
                name="state"
                type="text"
                defaultValue={info.state}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">State</span>
            </div>
            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="zip"
                name="zip"
                type="text"
                defaultValue={info.zip}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Zip</span>
            </div>
            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="genre"
                name="genre"
                type="text"
                defaultValue={info.genre}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Genre</span>
            </div>
            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="type"
                name="type"
                type="text"
                defaultValue={info.type}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Type</span>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-header">Account Details</div>

            <div className="user-input-wrp">
              <br/>
              <input
                className="inputText"
                cid="email"
                name="email"
                type="text"
                defaultValue={info.email}
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Email</span>
            </div>

            <div className="user-input-wrp pw-wrp">
              <br/>
              <input
                className="inputText"
                cid="password"
                name="password"
                type="password"
                onChange={this.handleChange}
                required
              />
              <span className="floating-label">Change Password</span>
            </div>
          </div>
          {
            this.state.errorMessage
            ? <div className='error'>{this.state.errorMessage}</div>
            : <div></div>
          }
          <button className="register-submit" onClick={this.handleSubmit}>Submit Changes</button>
        </form>
      </div>

    );
  }
}


export default RestaurantSettings;
