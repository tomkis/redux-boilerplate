import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux';
import { createDevTools } from 'redux-devtools';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import buildStore from '../../common/buildStore';
import buildComponent from '../../common/buildComponent';

import './styl/main.styl';

const buildReducer = updater => combineReducers({
  root: updater,
  routing: routerReducer
});

// Plain old Redux DevTools are being used in development
// DevTools Component is created even though it may not be potentially used
// as there might exist Redux DevTools extensions which overrides this
if (process.env.NODE_ENV === 'development') {
  const DevTools = createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      defaultIsVisible
    >
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );

  const store = buildStore(buildReducer(require('./domain/root/rootUpdater')), DevTools);
  const history = syncHistoryWithStore(browserHistory, store);

  // Render block is stored in function so that
  // it's possible to re-render entire app when
  // rootView changes, this is a free operation
  const doRender = () => {
    const rootView = require('./domain/root/rootView');
    const Component = buildComponent(rootView, store, history);

    const DevTooledComponent = () => (
      <div>
        {Component}
        <DevTools store={store} />
      </div>
    );

    render(
      <DevTooledComponent />,
      document.getElementById('app')
    );
  };

  // After view changes doRender is called
  // After updater changes, reducer is replaced
  if (module.hot) {
    module.hot.accept('./domain/root/rootView', doRender);
    module.hot.accept('./domain/root/rootUpdater', () => {
      store.replaceReducer(buildReducer(require('./domain/root/rootUpdater')));
    });
  }

  // initial render
  doRender();
} else {
  // Production build does not use DevTools.
  const store = buildStore(buildReducer(require('./domain/root/rootUpdater')));
  const history = syncHistoryWithStore(browserHistory, store);

  const Component = buildComponent(
    require('./domain/root/rootView'),
    store,
    history
  );

  render(
    Component,
    document.getElementById('app')
  );
}
