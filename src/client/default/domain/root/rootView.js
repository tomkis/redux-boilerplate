import React from 'react';
import { connect } from 'react-redux';
import { view, forwardTo } from 'redux-elm';
import { Router, Route, IndexRoute } from 'react-router';

import Template from '../../template/template';
import CounterView from '../counter/counterView';
import AsyncView from '../async/asyncView';

const connectView = (View, modelKey, ...nesting) =>
  connect(appState => ({ model: appState.root[modelKey] }))(
    props => <View {...props} dispatch={forwardTo(props.dispatch, ...nesting)} />);

const ConnectedCounterView = connectView(CounterView, 'counter', 'Counter');
const ConnectedAsyncView = connectView(AsyncView, 'async', 'Async');


export default view(({ history }) => (
  <Router history={history}>
    <Route path="/" component={Template}>
      <IndexRoute component={ConnectedCounterView} />
      <Route path="counter" component={ConnectedCounterView} />
      <Route path="async" component={ConnectedAsyncView} />
    </Route>
  </Router>
));
