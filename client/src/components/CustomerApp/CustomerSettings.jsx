// Import dependencies
import React from 'react';
import ApiService from '../../services/ApiService';

class CustomerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingEmail: false,
      passwordMatch: true,
      validEmail: true,
      validUsername: true,
      newPW1: '',
      newPW2: '',
      userName: ''
    };
  }

  componentDidMount(){
    let userInfo = JSON.parse(window.localStorage.state).user
    ApiService.getCustomerProfile(userInfo.userId)
      .then((userInfo) => {
        this.setState({...userInfo, originalEmail: userInfo.email });
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkFields = () => {
    const { email, newPW1, newPW2, originalEmail, userName } = this.state
    this.setState({
      passwordMatch: newPW1 === newPW2,
      validEmail: this.validateEmail(email),
      validUsername: userName ? true : false
    })
  }

  validFields = async () => {
    await this.checkFields();
    return this.state.validUsername && this.state.passwordMatch && this.state.validEmail;
  }

  saveChanges = async () => {
    const { id, email, originalEmail, userName, firstName, lastName, phone, newPW1, newPW2  } = this.state
    if(await this.validFields()){
      ApiService.updateCustomerProfile(id, userName, email, firstName, lastName, phone, originalEmail, newPW1)
        .then((user) => {
          this.props.loadCustomerUser(user);
          this.props.history.replace('/customer/home')
        })
        .catch((err)=>{
          console.log('error when updating', err)
          this.setState({existingEmail: true})
        })
    }
  }

  render(){
    const { email, userName, firstName, lastName, phone  } = this.state
    if(this.state.originalEmail){
      return(
        <div>
          <h2>&nbsp; Customer Settings</h2>

          <div className="user-input-wrp">
          <br/>
            <input className="update-input" name="email" type="text" defaultValue={email} onChange={this.handleChange} required/>
            <span className="floating-label">Update Email Address</span>
          </div>

          <div className="user-input-wrp">
          <br/>
            <input className="update-input" name="userName" type="text" defaultValue={userName} onChange={this.handleChange} required/>
            <span className="floating-label">Change Username</span>
          </div>

          <div className="user-input-wrp">
          <br/>
            <input className="update-input" name="firstName" type="text" defaultValue={firstName} onChange={this.handleChange} required/>
            <span className="floating-label">Change First Name</span>
          </div>

          <div className="user-input-wrp">
          <br/>
            <input className="update-input" name="lastName" type="text" defaultValue={lastName} onChange={this.handleChange} required/>
            <span className="floating-label">Change Last Name</span>
          </div>

          <div className="user-input-wrp">
          <br/>
            <input className="update-input" name="phone" type="text" defaultValue={phone} onChange={this.handleChange} required/>
            <span className="floating-label">Update Phone Number</span>
          </div>
        
          <div className="user-input-wrp pw-wrp">
          <br/>
            <input className="update-input" name="newPW1" type="text" onChange={this.handleChange} required/>
            <span className="floating-label">New Password</span>
          </div>

          <div className="user-input-wrp pw-wrp">
          <br/>
            <input className="update-input" name="newPW2" type="text" onChange={this.handleChange} required/>
            <span className="floating-label">Confirm New Password</span>
          </div>
          {
            this.state.existingEmail
            ? <div className="error">&nbsp; New email already exists </div>
            : <div></div>
          }
          {
            this.state.passwordMatch === false
            ? <div className="error">&nbsp; Passwords do not match </div>
            : <div></div>
          }
          {
            this.state.validEmail === false
            ? <div className="error">&nbsp; Not a valid email </div>
            : <div></div>
          }
          {
            this.state.validUsername === false
            ? <div className="error">&nbsp; Please provide a username </div>
            : <div></div>
          }
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className="register-submit" onClick={this.saveChanges}>Save Changes</button>
          </div>
        </div>
      )
    } else {
      return <h2>&nbsp; Loading...</h2>
    }
  }
}



export default CustomerSettings;