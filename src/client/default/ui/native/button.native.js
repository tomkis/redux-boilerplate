import React, { PropTypes } from 'react';
import { Text, TouchableHighlight } from 'react-native';

const Button = ({ text, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>{text}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
