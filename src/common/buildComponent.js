import React from 'react';
import { Provider, connect } from 'react-redux';

export default (View, store) => {
  const ConnectedView = connect(appState => ({
    model: appState
  }))(View);

  return (
    <Provider store={store}>
      <ConnectedView />
    </Provider>
  );
};

