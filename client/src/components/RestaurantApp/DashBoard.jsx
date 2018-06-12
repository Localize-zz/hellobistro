// Import dependencies
import React from 'react';

// Import Widget Components
import {
  WidgetTotalRevenueContainer,
  WidgetTotalCustomersContainer,
  WidgetTopCustomersOrdersContainer,
  WidgetItemOrderTotalsContainer,
  WidgetTotalRevenueByMonthContainer,
  WidgetTotalRevenueByDayContainer,
} from '../Containers';

// Import CSS
import '../../styles/DashBoard.css';

const DashBoard = props => (
  <div className="DashBoard">
    <div className="page-header">
      <p>
        Here is how <strong>{props.state.restaurant.restaurantInfo.name}</strong> is doing
        at-a-glance:
      </p>
    </div>
    <WidgetTotalRevenueContainer />
    <WidgetTotalCustomersContainer />
    <WidgetTotalRevenueByMonthContainer />
    <WidgetTopCustomersOrdersContainer />
    <WidgetItemOrderTotalsContainer />
    <WidgetTotalRevenueByDayContainer />
  </div>
);

export default DashBoard;
