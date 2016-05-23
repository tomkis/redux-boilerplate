import React from 'react';
import { Provider } from 'react-redux';

export default (View, store, history) => () => (
  <Provider store={store}>
    <View history={history} dispatch={store.dispatch} />
  </Provider>
);
