import { ActionType } from '../lib/ActionType';
import * as TestingReducer from './testingReducer';

export default function* masterReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.APPLICATION_MOUNTING:
      return yield* TestingReducer.applicationMounting(state);

    case ActionType.ROUTER_BOOTSTRAPPED:
      return yield* TestingReducer.routerBootstrapped(state, payload);

    case ActionType.FOO_CLICKED:
      return yield* TestingReducer.fooClicked(state);

    case ActionType.BAR_CLICKED:
      return yield* TestingReducer.barClicked(state);

    default:
//      console.warn(`Unhandled action type: ${type}`);
      return state;
  }
}
