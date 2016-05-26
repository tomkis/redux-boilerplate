import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { view } from 'redux-elm';

export default view(({ model, dispatch }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <TouchableHighlight onPress={() => dispatch({ type: 'Increment' })}>
      <Text>Clicked {model}x</Text>
    </TouchableHighlight>
  </View>
));
