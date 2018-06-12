import React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = (props) => {
  const { type } = props;
  return <div className={`${type}-loader`} />;
};

LoadingIndicator.propTypes = {
  type: PropTypes.string,
};

export default LoadingIndicator;
