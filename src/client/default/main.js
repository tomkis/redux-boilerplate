import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import buildStore from '../../common/buildStore';
import buildReducer from '../../common/buildReducer';

import './styl/main.styl';

const buildComponent = (store, history) => {
  const View = require('./domain/root/rootView').default;

  return () => (
    <Provider store={store}>
      <View history={history} dispatch={store.dispatch} />
    </Provider>
  );
};

// Plain old Redux DevTools are being used in development
// DevTools Component is created even though it may not be potentially used
// as there might exist Redux DevTools extensions which overrides this
if (process.env.NODE_ENV === 'development') {
  const store = buildStore(
    buildReducer(require('./domain/root/rootUpdater').default),
    JSON.parse(window.reduxState)
  );
  const history = syncHistoryWithStore(browserHistory, store);

  // Render block is stored in function so that
  // it's possible to re-render entire app when
  // rootView changes, this is a free operation
  const doRender = () => {
    const Component = buildComponent(store, history);

    render(
      <Component />,
      document.getElementById('app')
    );
  };

  // After view changes doRender is called
  // After updater changes, reducer is replaced
  if (module.hot) {
    module.hot.accept('./domain/root/rootView', doRender);
    module.hot.accept('./domain/root/rootUpdater', () => {
      store.replaceReducer(buildReducer(require('./domain/root/rootUpdater').default));
    });
  }

  // initial render
  doRender();
} else {
  // Production build does not use DevTools.
  const store = buildStore(
    buildReducer(require('./domain/root/rootUpdater').default),
    JSON.parse(window.reduxState)
  );
  const history = syncHistoryWithStore(browserHistory, store);
  const Component = buildComponent(store, history);

  render(
    <Component />,
    document.getElementById('app')
  );
}
