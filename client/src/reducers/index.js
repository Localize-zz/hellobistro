// Import dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import individual reducers
import customer from './customer';
import restaurant from './restaurant';
import user from './user';
import modals from './modals';
import ui from './ui';

// Create a Root Reducer
const appReducer = combineReducers({
  modals, ui, customer, restaurant, user, routing: routerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
