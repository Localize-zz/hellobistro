// Import dependencies
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

// Import CSS
import '../../../styles/Widgets.css';

const WidgetItemOrderTotals = (props) => {

  const { itemOrderTotals } = props.state.restaurant.analytics;
  console.log(itemOrderTotals);

  return (
    <div className="WidgetTotalCustomers widget widget-small">
      <div className="widget-header-icon mat-color-lightblue"><i className="material-icons">restaurant</i></div>
      <div className="widget-header-text">Menu Item Orders</div>
      <div className="section-chart">
      {
        !itemOrderTotals ? <div className="loading-spinner" />
        :
      <Doughnut data={itemOrderTotals.widgetData} width={300} height={300} options={{responsive: false}} legend={{position: 'bottom'}} />
      }
      </div>

    </div>
  );
};

export default WidgetItemOrderTotals;
