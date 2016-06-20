import { view } from 'redux-elm';

import buildRouting from './buildRouting';

export default view(({ history, dispatch }) => buildRouting(history, dispatch));
