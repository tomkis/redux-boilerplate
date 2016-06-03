import React, { PropTypes } from 'react';

const AsyncWrapper = ({ children }) => <div>{children}</div>;

AsyncWrapper.propTypes = {
  children: PropTypes.node
};

export default AsyncWrapper;
