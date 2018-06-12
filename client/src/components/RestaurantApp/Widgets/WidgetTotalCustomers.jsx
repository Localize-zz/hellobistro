// Import dependencies
import React from 'react';

// Import CSS
import '../../../styles/Widgets.css';

const WidgetTotalCustomers = (props) => {
  return (
    <div className="WidgetTotalCustomers widget widget-small">
      <div className="widget-header-icon mat-color-purple"><i className="material-icons">people</i></div>
      <div className="widget-header-text">Total Customers</div>

      <div className="section info">
      <span className="info-detail">{props.state.restaurant.analytics.totalCustomersLast30Days}</span>
        <span className="info-label">Unique (Last 30 Days)</span>
      </div>

            <div className="section info">
      <span className="info-detail">{props.state.restaurant.analytics.totalCustomersLast60Days}</span>
        <span className="info-label">Unique (Last 60 Days)</span>
      </div>

            <div className="section info">
      <span className="info-detail">{props.state.restaurant.analytics.totalCustomersLast90Days}</span>
        <span className="info-label">Unique (Last 90 Days)</span>
      </div>

            <div className="section info">
      <span className="info-detail">{props.state.restaurant.analytics.totalCustomers}</span>
        <span className="info-label">Unique Lifetime</span>
      </div>


    </div>
  );
};

export default WidgetTotalCustomers;
