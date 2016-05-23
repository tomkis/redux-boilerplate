import React from 'react';
import { view } from 'redux-elm';

import Greeting from '../../ui/greeting';

export default view(({ model, dispatch }) => (
  <div>
    {!model && <button onClick={() => dispatch({ type: 'Fetch' })}>Fetch</button>}
    {!!model && <Greeting>{model}</Greeting>}
  </div>
));
