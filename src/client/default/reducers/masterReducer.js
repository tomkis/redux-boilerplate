
import initialState from 'reducers/initialState';
import fooReducer from 'reducers/fooReducer';
import barReducer from 'reducers/barReducer';

export default function* masterReducer(state = initialState, action) {
  state = yield *fooReducer(state, action);
  state = yield *barReducer(state, action);
  return state;
}
