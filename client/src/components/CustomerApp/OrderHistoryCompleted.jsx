import React from 'react';
import moment from 'moment';

const renderItems = list => list.map(item => <li>{item.name}</li>);

const OrderHistoryCompleted = ({ data }) => (
  <tr key={data.id}>
    <td>{data.id}</td>
    <td>{moment(data.createdAt).format('MMM D, YYYY')}</td>
    <td>{data.Restaurant.name}</td>
    <td>${data.total}</td>
  </tr>
);

export default OrderHistoryCompleted;
