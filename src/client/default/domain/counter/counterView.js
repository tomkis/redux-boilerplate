import React from 'react';
import { view } from 'redux-elm';

import Button from '../../ui/button';

export default view(({ model, dispatch }) =>
  <Button text={`Clicked ${model}x`} onClick={() => dispatch({ type: 'Increment' })} />);
