// Import dependencies
import React from 'react';

// Import CSS
import '../../styles/Mast.css';

const Mast = props => (
  <div className="customer-mast">
    <div className="menu-control" onClick={props.toggleNav}>
      <i className="material-icons">menu</i>
    </div>
    <span className="hb-header">{props.primaryText || 'HelloBistro'}</span>
  </div>
);

export default Mast;