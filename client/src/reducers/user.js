// Set initial state
const initialState = {
  user: null,
};

// User reducer
function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return Object.assign({}, state, {
        user: action.user,
      });
    case 'LOAD_CUSTOMER':
      return Object.assign({}, state, { ...action.data });
    case 'UPDATE_PAYMENT_METHODS':
      return Object.assign({}, state, { ...state.user, paymentMethods: action.data });
    default:
      return state;
  }
}


export default user;