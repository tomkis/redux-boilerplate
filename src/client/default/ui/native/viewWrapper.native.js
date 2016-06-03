import React, { PropTypes } from 'react';
import { View } from 'react-native';

const AsyncWrapper = ({ children }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </View>
);

AsyncWrapper.propTypes = {
  children: PropTypes.node
};

export default AsyncWrapper;
