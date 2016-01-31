import * as TestingActions from '../actions/testingActions';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

export function* applicationMounting(state) {
  yield (dispatch) => {
    dispatch(TestingActions.routerBootstrapped(history));
  };

  return state;
}

export function* routerBootstrapped(state, _history) {
  return state.setIn(['appState', 'history'], _history);
}

export function* fooClicked(state) {
  history.pushState({}, '/foo');
  return state;
}

export function* barClicked(state) {
  history.pushState({}, '/bar');
  return state;
}
