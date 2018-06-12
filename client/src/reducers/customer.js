function customer(state = {
  currentRestaurant: { MenuSections: ['loading'] },
  cart: {
    paymentId: null, restaurantId: null, items: {}, table: null,
  },
}, action) {
  switch (action.type) {
    case 'LOAD_RESTAURANT_LIST':
      return Object.assign({}, state, {
        restaurants: action.data,
      });
    case 'LOAD_CLOSEST_RESTAURANT_LIST':
      return Object.assign({}, state, {
        closestRestaurants: action.data,
      });
    case 'LOAD_SELECTED_RESTAURANT':
      return Object.assign({}, state, {
        currentRestaurant: action.data,
      });
    case 'ADD_TO_CART':
      return Object.assign({}, state, {
        cart: {
          items: !state.cart || !state.cart.items ? { [action.data.id]: action.data } : { ...state.cart.items, [action.data.id]: action.data },
        },
      });
    case 'EDIT_CART_ITEM':
      return Object.assign({}, state, {
        cart: {
          ...state.cart,
          items: {
            ...state.cart.items,
            [action.id]: {
              ...state.cart.items[action.id],
              [action.key]: action.value,
            },
          },
        },
      });
    case 'DELETE_CART_ITEM': {
      if (Object.keys(state.cart.items).length > 1) {
        const oldState = Object.assign({}, state);
        delete oldState.cart.items[action.id];
        return oldState;
      }
      return Object.assign({}, state, {
        cart: {
          restaurantId: null, items: {}, table: null, paymentId: null,
        },
      });
    }
    case 'CLEAR_CART':
      return Object.assign({}, state, {
        cart: {
          restaurantId: null, items: {}, table: null, paymentId: null,
        },
      });
    case 'SET_CART_RESTAURANT':
      return Object.assign({}, state, {
        cart: { ...state.cart, restaurantId: action.id },
      });
    case 'LOAD_ORDERS':
      return Object.assign({}, state, {
        orders: action.data,
      });
    case 'UPDATE_ORDER':
      return Object.assign({}, state, {
        orders: state.orders.map((order => (order.id === action.orderId ? { ...order, status: 'completed' } : order))),
      });
    case 'UPDATE_TABLE':
      return Object.assign({}, state, {
        cart: { ...state.cart, table: action.tableNumber },
      });
    case 'CHOOSE_PAYMENT':
      return Object.assign({}, state, {
        cart: { ...state.cart, paymentId: action.paymentId },
      });
    case 'SET_CUSTOMER_LOCATION':
      return Object.assign({}, state, {
        location: { latitude: action.lat, longitude: action.long },
      });
    default:
      return state;
  }
}

export default customer;
