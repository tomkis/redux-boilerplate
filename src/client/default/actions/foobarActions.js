import buildMessage from 'buildMessage';
import * as Actions from 'constants/actions';

export const fooRequested = () => buildMessage(Actions.FOO_REQUESTED);
export const fooReceived = (content) => buildMessage(Actions.FOO_RECEIVED, content);

export const barClicked = () => buildMessage(Actions.BAR_CLICKED);
