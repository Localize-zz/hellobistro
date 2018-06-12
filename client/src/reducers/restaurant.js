const initialState = {
  data: {
    MenuSections: [],
    openOrders: [],
  },
  restaurantInfo: {},
  analytics: {},
};

function restaurant(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_RESTAURANT_DATA':
      return Object.assign({}, state, {
        data: action.data,
      });
    case 'ADD_RESTAURANT':
      return Object.assign({}, state, {
        restaurantInfo: action.data
      });
    case 'UPDATE_RESTAURANT_DATA':
      console.log('update rest reducer called with ', action.data);
      return Object.assign({}, state, {
        restaurantInfo: action.data, 
      });
    case 'UPDATE_ANALYTICS_DATA':
      return Object.assign({}, state, {
        analytics: action.data,
      });
    case 'REFRESH_OPEN_ORDERS':
      return Object.assign({}, state, {
        data: {
          ...state.data,
          openOrders: action.data,
        },
      });
    default:
      return state;
  }
}

export default restaurant;
