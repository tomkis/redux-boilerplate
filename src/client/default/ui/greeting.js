import React, { PropTypes } from 'react';

const Greeting = ({ children }) => <h1>{children}</h1>;

Greeting.propTypes = {
  children: PropTypes.node
};

export default Greeting;
