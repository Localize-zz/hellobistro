import React from 'react';

const MenuItem = (props) => {
  const addToCart = () => {
    // check if item is already in cart
    if (!props.state.customer.cart.items[props.data.id]) {
      // if not, add item to cart with quantity and special keys.
      props.data.quantity = 1;
      props.data.special = '';
      props.state.customer.cart.items[props.data.id] = props.data;
    }
    // check if cart restaurant is already set.
    if (!props.state.customer.cart.restaurantId) {
      props.setCartRestaurant(props.data.RestaurantId);
    }
    props.modalOn('orderModal', props.state.customer.cart.items[props.data.id]);
  };
  const price = props.data.price.toFixed(2);
  const description = props.data.description ? <p>{props.data.description}</p> : null;
  const button = !props.state.customer.cart.restaurantId || props.state.customer.cart.restaurantId === props.state.customer.currentRestaurant.id ? <button className="menu-add-button" onClick={addToCart}><i className="material-icons">add</i></button> : null;

  return (
    <div className="customer-menu-item">
      <p><img className="item-image" src={props.data.image}/></p>
      <h3><strong>{props.data.name}</strong> ${price}</h3>
      <p>{description}</p>
      {button}
    </div>
  );
};

export default MenuItem;
