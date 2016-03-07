
import initialState from './initialState';
import fooReducer from './fooReducer';
import barReducer from './barReducer';

export default function* masterReducer(state = initialState, action) {
  state = yield *fooReducer(state, action);
  state = yield *barReducer(state, action);
  return state;
}
