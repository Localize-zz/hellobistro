import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import App from './App';
import CustomerApp from './CustomerApp/CustomerApp';
import Mast from './CustomerApp/Mast';
import ModalBackdrop from './Modals/ModalBackdrop';
import OrderModal from './Modals/OrderModal';
import WidgetUserModal from './Modals/WidgetUserModal';
import Notifications from './Modals/Notifications';
import RestaurantApp from './RestaurantApp/RestaurantApp';
import RestaurantLogin from './RestaurantApp/RestaurantLogin';
import ConfirmOrder from './CustomerApp/ConfirmOrder';
import CustomerLogin from './CustomerApp/CustomerLogin';
import CustomerNav from './CustomerApp/CustomerNav';
import RestaurantNav from './RestaurantApp/RestaurantNav';
import PaymentMethods from './CustomerApp/PaymentMethods';
import Favorites from './CustomerApp/Favorites';
import FindRestaurants from './CustomerApp/FindRestaurants';
import Menu from './CustomerApp/Menu';
import MenuItem from './CustomerApp/MenuItem';
import Order from './CustomerApp/Order';
import OrderItem from './CustomerApp/OrderItem';
import OrderHistory from './CustomerApp/OrderHistory';
import OrderStatus from './CustomerApp/OrderStatus';
import DashBoard from './RestaurantApp/DashBoard';
import MenuManager from './RestaurantApp/MenuManager';
import RestaurantRegister from './RestaurantApp/RestaurantRegister';
import RestaurantSettings from './RestaurantApp/RestaurantSettings';
import CustomerList from './RestaurantApp/CustomerList';
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
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export const CustomerAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerApp));
export const MastContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Mast));
export const ModalBackdropContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop));
export const OrderModalContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderModal));
export const WidgetUserModalContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetUserModal));
export const NotificationsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));
export const RestaurantAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantApp));
export const RestaurantNavContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantNav));
export const CustomerNavContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerNav));
export const RestaurantLoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantLogin));
export const ConfirmOrderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder));
export const CustomerLoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerLogin));
export const PaymentMethodsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentMethods));
export const FavoritesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
export const FindRestaurantsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FindRestaurants));
export const MenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
export const MenuItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItem));
export const OrderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
export const OrderItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderItem));
export const OrderHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderHistory));
export const OrderStatusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderStatus));
export const DashBoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));
export const MenuManagerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuManager));
export const RestaurantRegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantRegister));
export const RestaurantSettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantSettings));
export const CustomerListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerList));
export const CustomerRegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerRegister));
export const CustomerSettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerSettings));
export const OrderManagerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderManager));
export const WidgetTotalRevenueContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenue));
export const WidgetTotalCustomersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalCustomers));
export const WidgetTopCustomersOrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTopCustomersOrders));
export const WidgetItemOrderTotalsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetItemOrderTotals));
export const WidgetTotalRevenueByMonthContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenueByMonth));
export const WidgetTotalRevenueByDayContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetTotalRevenueByDay));
