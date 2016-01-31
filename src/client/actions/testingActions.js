import invariant from 'invariant';

import { ActionType } from '../lib/ActionType';
import buildMessage from '../buildMessage';

export const applicationMounting =
    () => buildMessage(ActionType.APPLICATION_MOUNTING);

export const routerBootstrapped = history => {
  invariant(history, 'History object is mandatory');

  return buildMessage(ActionType.ROUTER_BOOTSTRAPPED, history);
};

export const fooClicked = () => buildMessage(ActionType.FOO_CLICKED);

export const barClicked = () => buildMessage(ActionType.BAR_CLICKED);

