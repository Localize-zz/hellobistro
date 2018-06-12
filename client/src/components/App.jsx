// Import dependencies
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// Import services
import AuthService from '../services/AuthService';

// Import Customer/RestaurantApp component and subcomponents
import {
  CustomerAppContainer,
  RestaurantAppContainer,
  RestaurantLoginContainer,
  CustomerLoginContainer,
  CustomerSettingsContainer,
  RestaurantRegisterContainer,
  MenuManagerContainer,
  RestaurantSettingsContainer,
  PromosContainer,
  CustomerRegisterContainer,
  ModalBackdropContainer,
  NotificationsContainer,
} from './Containers';

// Create parent application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  checkUser = () => {
    var token = AuthService.getToken()
    var decoded = jwt.decode(token, {complete: true});
    if(token){
      if(decoded.payload.userType === 'Customer'){
        return 'Customer';
      } else if(decoded.payload.userType === 'Restaurant'){
        return 'Restaurant';
      }
    }
  }
  
  render() {

    if (this.state.error) {
      //render fallback UI
      return (
        <div>
          <p>We're sorry — something's gone wrong.</p>
        </div>
      );
  } else {
    return (
      <div className="App"> 
        {/* <Switch> */}
        <ModalBackdropContainer />
        {
        this.checkUser() === 'Customer'
         ? <Route path="/customer/home" component={CustomerAppContainer} />
         : this.checkUser() === 'Restaurant'
         ? <Route path="/restaurant/home" component={RestaurantAppContainer} /> 
         : ''
        }
        <Route exact path="/" component={CustomerLoginContainer} />
        <Route path="/customer/login" component={CustomerLoginContainer} />
        <Route path="/restaurant/login" component={RestaurantLoginContainer} />
        <Route path="/customer/register" component={CustomerRegisterContainer} />
        <Route path="/restaurant/userRegister" component={RestaurantRegisterContainer} />
        {/* </Switch> */}
      </div>
    );
  }


  }
}

export default App;
