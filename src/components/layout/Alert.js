import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => {
  const { message, messageType } = props;
  return (
    <div
      className={
        messageType === 'success' ? 'alert alert-success' ||
        messageType === 'error' : 'alert alert-danger'
      }
    >
      {message}
    </div>
  )
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
