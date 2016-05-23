import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { compose, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createEffectCapableStore } from 'redux-side-effects';

import masterReducer from 'reducers/masterReducer';
import routes from 'routes';

import 'styl/main.styl';

const enhancers = [
  applyMiddleware(routerMiddleware(browserHistory)),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
];
const createStoreWithMiddleware = compose.apply(null, enhancers)(createStore);
const storeFactory = createEffectCapableStore(createStoreWithMiddleware);
const store = storeFactory(function*(state, action) {
  return {
    app: yield *masterReducer(state && state.app, action),
    routing: routerReducer(state && state.routing, action)
  };
});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
, document.getElementById('app'));