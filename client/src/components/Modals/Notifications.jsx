import React from 'react';
import '../../styles/Modals.css';

const Notifications = (props) => {
  const componentClasses = ['notifications'];
  if (props.state.ui.notifications.length > 0) {
    componentClasses.push('show');
  }

  return (
    <div className={componentClasses.join(' ')}>
      <i className="material-icons notify">restaurant</i><span className="notification-message">Your food is ready!</span><i className="material-icons notify-close" onClick={props.clearNotification}>close</i>
    </div>
  );
};

export default Notifications;
