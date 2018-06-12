import React from 'react';
import '../../styles/Modals.css';
import { OrderModalContainer, WidgetUserModalContainer } from '../Containers';

const ModalBackdrop = (props) => {
  if (!props.state.modals.visible) {
    return null;
  } else if (!props.state.modals.id || !props.state.modals.data) {
    props.modalOff();
  }

  const { id } = props.state.modals;

  // MODAL TEMPLATES
  const modals = {
    orderModal: <OrderModalContainer />,
    widgetUserModal: <WidgetUserModalContainer />,
  };

  return (
    <div className="modal-backdrop">
      {modals[id]}
    </div>
  );
};

export default ModalBackdrop;
