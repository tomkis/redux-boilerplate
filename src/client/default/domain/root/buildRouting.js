import React from 'react';
import { connect } from 'react-redux';
import { forwardTo } from 'redux-elm';
import { Router, Route, IndexRoute } from 'react-router';

import * as Routes from './routes';
import Template from '../../template/template';
import CounterView from '../counter/counterView';
import AsyncView from '../async/asyncView';

const connectView = (View, modelKey, ...nesting) =>
  connect(appState => ({ model: appState.root[modelKey] }))(
    props => <View {...props} dispatch={forwardTo(props.dispatch, ...nesting)} />);

const ConnectedCounterView = connectView(CounterView, 'counter', 'Counter');
const ConnectedAsyncView = connectView(AsyncView, 'async', 'Async');

const urlHasChanged = (route, dispatch) => () => dispatch({ type: 'UrlHasChanged', route });

export default (history, dispatch) => (
  <Router history={history}>
    <Route path="/" component={Template}>
      <IndexRoute
        component={ConnectedCounterView}
        onEnter={urlHasChanged(Routes.Counter, dispatch)}
      />
      <Route
        path="counter"
        component={ConnectedCounterView}
        onEnter={urlHasChanged(Routes.Counter, dispatch)}
      />
      <Route
        path="async"
        component={ConnectedAsyncView}
        onEnter={urlHasChanged(Routes.Async, dispatch)}
      />
    </Route>
  </Router>
);
