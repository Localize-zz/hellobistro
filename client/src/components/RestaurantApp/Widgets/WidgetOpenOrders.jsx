// Import dependencies
import React from 'react';

// Import CSS
import '../../../styles/Widgets.css';

const WidgetOpenOrders = (props) => {
  return (
    <div className="WidgetTotalCustomers widget widget-small">
      <div className="widget-header-icon mat-color-orange"><i className="material-icons">people</i></div>
      <div className="widget-header-text">Open Orders</div>
      <div className="section info">
        <span className="info-detail">122</span>
        <span className="info-label">yummykins22</span>
      </div>
    </div>
  );
};

export default WidgetOpenOrders;
