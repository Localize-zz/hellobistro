import React from 'react';
import moment from 'moment';

class OrderTimer extends React.Component {
  componentDidMount() {
    setTimeout(() => { this.forceUpdate(); }, 60000);
  }

  render() {
    return (
      <div>
        <div>Placed <strong>{moment().diff(moment(this.props.order.createdAt), 'minutes')} minutes</strong> ago
        </div>
      </div>
    );
  }
}

export default OrderTimer;
