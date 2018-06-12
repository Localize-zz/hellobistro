import React from 'react';
import moment from 'moment';

class OrderHistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }

  renderItems = list => {
    return list.map(item => <p key={item.id}><strong>{item.name}</strong> | Quantity: {item.OrderItem.quantity} | Unit Price: ${item.price.toFixed(2)}</p>);
  }

  clickHandler = () => {
    this.setState({ expand: !this.state.expand, })
  }

  render() {
    const orderPrep = this.props.data.MenuItems.reduce((a, b) => ({prepTime: a.prepTime + b.prepTime}), { prepTime: 0 });
    const currentWait = moment(this.props.data.createdAt).add(orderPrep.prepTime || 0, 'minutes').diff(moment(), 'minutes')
    const delay = currentWait > 0 ? 'Your estimated wait is ' + currentWait + '\u00A0minute(s).' : <div><i className="material-icons order-delay">error</i>Your order is delayed. Check with staff.</div>
    const expanded = this.state.expand ? <tr className="order-history-expand"><td colSpan="4"><div className="item-expansion-row"><i className="material-icons order-delay">check_circle_outline</i><strong>This order includes:</strong>{this.renderItems(this.props.data.MenuItems)}</div></td></tr> : null;
    if (currentWait > 0) {setTimeout(() => {this.forceUpdate()}, 60000)}
    return (
      <tbody onClick={this.clickHandler}>
        <tr>
          <td>{this.props.data.status === 'completed' ? 'Your order is ready.' : delay}</td>
          <td>{this.props.data.id}</td>
          <td>{this.props.data.Restaurant.name}</td>
          <td>${this.props.data.total}</td>
        </tr>
        {expanded}
      </tbody>
    )
  }
};

export default OrderHistoryItem;
