function modals(state = { id: null, data: {}, visible: false }, action) {
  switch (action.type) {
    case 'MODAL_ON':
      return Object.assign({}, state, {
        id: action.id,
        data: action.data,
        visible: true,
      });
    case 'MODAL_OFF':
      return Object.assign({}, state, {
        id: null,
        data: {},
        visible: false,
      });
    case 'ADD_ORDERS':
      return Object.assign({}, state, {
        data: { ...state.data, orders: action.data },
      });
    default:
      return state;
  }
}

export default modals;
