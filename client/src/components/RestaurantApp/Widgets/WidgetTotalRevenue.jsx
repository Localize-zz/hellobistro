// Import dependencies
import React from "react";

// Import CSS
import "../../../styles/Widgets.css";

const WidgetTotalRevenue = props => {

  const { totalRevenue, totalRevenueLast30Days, totalRevenueLast60Days } = props.state.restaurant.analytics;

  const renderValue = (value) => {
    return !value ? 'loading...' : value;
  }

  return (
    <div className="WidgetTotalRevenue widget widget-small">
      <div className="widget-header-icon mat-color-green">
        <i className="material-icons">attach_money</i>
      </div>
      <div className="widget-header-text">Total Revenue</div>
      <div className="section info">
        <span className="info-detail">

        {
          !totalRevenue ? <div className="loading-spinner"></div>:
          <span>${totalRevenueLast30Days.toFixed(2)}</span>
        }

        </span>{" "}
        <span className="info-label">Last 30 Days</span>
      </div>
      <div className="section info">
        <span className="info-detail">
        {
          !totalRevenue ? <div className="loading-spinner"></div>:
          <span>${totalRevenueLast60Days.toFixed(2)}</span>
        }
        </span>
        <span className="info-label">Last 60 Days</span>
      </div>
      <div className="section info">
        <span className="info-detail">
        {
          !totalRevenue ? <div className="loading-spinner"></div>:
          <span>${totalRevenue.toFixed(2)}</span>
        }
        </span>
        <span className="info-label">Lifetime</span>
      </div>
    </div>
  );

};

export default WidgetTotalRevenue;
