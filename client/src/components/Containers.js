import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import App from './App';
import CustomerApp from './CustomerApp/CustomerApp';
import RestaurantApp from './RestaurantApp/RestaurantApp';
import RestaurantLogin from './RestaurantApp/RestaurantLogin';
import ConfirmOrder from './CustomerApp/ConfirmOrder';
import CustomerLogin from './CustomerApp/CustomerLogin';
import FindRestaurants from './CustomerApp/FindRestaurants';
import Menu from './CustomerApp/Menu';
import MenuItem from './CustomerApp/MenuItem';
import Order from './CustomerApp/Order';
import OrderHistory from './CustomerApp/OrderHistory';
import OrderStatus from './CustomerApp/OrderStatus';
import Restaurant from './CustomerApp/Restaurant';
import RestaurantList from './CustomerApp/RestaurantList';
import DashBoard from './RestaurantApp/DashBoard';
import MenuManager from './RestaurantApp/MenuManager';
import Promos from './RestaurantApp/Promos';
import RestaurantRegister from './RestaurantApp/RestaurantRegister';
import RestaurantSettings from './RestaurantApp/RestaurantSettings';
import CustomerRegister from './CustomerApp/CustomerRegister';
import CustomerSettings from './CustomerApp/CustomerSettings';
import OrderManager from './RestaurantApp/OrderManager';
import WidgetTotalRevenue from './RestaurantApp/Widgets/WidgetTotalRevenue';
import WidgetTotalCustomers from './RestaurantApp/Widgets/WidgetTotalCustomers';
import WidgetTopCustomersOrders from './RestaurantApp/Widgets/WidgetTopCustomersOrders';
import WidgetItemOrderTotals from './RestaurantApp/Widgets/WidgetItemOrderTotals';
import WidgetTotalRevenueByMonth from './RestaurantApp/Widgets/WidgetTotalRevenueByMonth';
import WidgetTotalRevenueByDay from './RestaurantApp/Widgets/WidgetTotalRevenueByDay';
import { withRouter } from 'react-router';


function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export const CustomerAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerApp));
export const RestaurantAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantApp));
export const RestaurantLoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantLogin));
export const ConfirmOrderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder));
export const CustomerLoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerLogin));
export const FindRestaurantsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FindRestaurants));
export const MenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
export const MenuItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItem));
export const OrderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
export const OrderHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderHistory));
export const OrderStatusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderStatus));
export const RestaurantContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Restaurant));
export const RestaurantListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantList));
export const DashBoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));
export const MenuManagerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuManager));
export const PromosContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Promos));
export const RestaurantRegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantRegister));
export const RestaurantSettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantSettings));
export const CustomerRegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerRegister));
export const CustomerSettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerSettings));
export const OrderManagerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderManager));
export const WidgetTotalRevenueContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenue));
export const WidgetTotalCustomersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalCustomers));
export const WidgetTopCustomersOrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTopCustomersOrders));
export const WidgetItemOrderTotalsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetItemOrderTotals));
export const WidgetTotalRevenueByMonthContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenueByMonth));
export const WidgetTotalRevenueByDayContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenueByDay));
