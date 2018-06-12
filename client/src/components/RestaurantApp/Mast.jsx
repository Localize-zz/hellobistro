// Import dependencies
import React from 'react';

// Import CSS
import '../../styles/Mast.css';

const Mast = (props) => (
  <div className="Mast">
    <span>{props.primaryText || 'HelloBistro'}</span>
  </div>);

export default Mast;
