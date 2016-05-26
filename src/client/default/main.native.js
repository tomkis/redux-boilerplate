import React from 'react';
import { Provider, connect } from 'react-redux';

import buildStore from '../../common/buildStore';
import buildReducer from '../../common/buildReducer';

import rootUpdater from './domain/root/rootUpdater';
import rootView from './domain/root/rootView.native';

const buildView = store => () => {
  const ConnectedView = connect(appState => ({ model: appState.root }))(rootView);

  return (
    <Provider store={store}>
      <ConnectedView />
    </Provider>
  );
};

export default () => {
  const store = buildStore(buildReducer(rootUpdater));
  return buildView(store);
};
