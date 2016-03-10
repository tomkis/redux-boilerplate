import * as Actions from 'constants/actions';
import { fooReceived } from 'actions/foobarActions';

/*eslint no-unused-vars: 0*/
export default function* barReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case Actions.BAR_CLICKED:
      return state.update('barCounter', barCounter => barCounter + 1);
  }
  return state;
}
