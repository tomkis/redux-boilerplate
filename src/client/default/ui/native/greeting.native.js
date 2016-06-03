import React, { PropTypes } from 'react';
import { Text } from 'react-native';

const Greeting = ({ children }) => <Text>{children}</Text>;

Greeting.propTypes = {
  children: PropTypes.node
};

export default Greeting;
