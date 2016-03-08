import * as Actions from '../constants/actions';
import { fooReceived } from '../actions/foobarActions';

/*eslint no-unused-vars: 0*/
export default function* fooReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case Actions.FOO_REQUESTED:
      yield dispatch => {
        setTimeout(() => dispatch(fooReceived("Foo is here!")), 250);
      };
      return state;
    case Actions.FOO_RECEIVED:
      return state.set('foo', payload);
  }
  return state;
}
