// Import dependencies
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Import CSS
import '../../../styles/Widgets.css';

const WidgetTotalRevenueByMonth = (props) => {
  const myOptions = {
    legend: {
      display: false,
    },
    responsive: true,
  };

  const renderChart = () => (!props.state.restaurant.analytics.totalRevenueByMonth ? 'loading...'
    : <Bar
      data={props.state.restaurant.analytics.totalRevenueByMonth.widgetData}
      options={{ responsive: true }}
      legend={{ display: false }}
    />);

  return (
    <div className="WidgetTotalRevenueByMonth widget widget-medium">
      <div className="widget-header-icon mat-color-lightblue">
        <i className="material-icons">attach_money</i>
      </div>
      <div className="widget-header-text">
        Total Revenue Per Month (lifetime)
      </div>
      <div className="section-chart">
        {renderChart()}
      </div>
    </div>
  );
};

export default WidgetTotalRevenueByMonth;
