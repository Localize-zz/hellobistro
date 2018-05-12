import React from 'react';
import '../../styles/Modals.css';

import { OrderModalContainer } from '../Containers';

const CustomerModals = (props) => {
  if (!props.state.modals.visible) {
    return null;
  } else if (!props.state.modals.id || !props.state.modals.data) {
    props.modalOff();
  }

  const { id } = props.state.modals;

  // MODAL TEMPLATES
  const modals = {
    orderModal: <OrderModalContainer />,
  };

  return (
    <div className="modal-backdrop">
      {modals[id]}
    </div>
  );
};

export default CustomerModals;
