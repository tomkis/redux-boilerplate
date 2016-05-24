import { view } from 'redux-elm';

import buildRouting from './buildRouting';

export default view(({ history }) => buildRouting(history));
