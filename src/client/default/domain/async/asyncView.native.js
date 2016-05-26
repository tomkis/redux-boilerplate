import React, { PropTypes } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { view } from 'redux-elm';

const Button = ({ onPress, children }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>{children}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default view(({ model, dispatch }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {!model && <Button onPress={() => dispatch({ type: 'Fetch' })}>Fetch</Button>}
    {!!model && <Text>{model}</Text>}
  </View>
));
