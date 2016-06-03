import React from 'react';
import { view } from 'redux-elm';

import AsyncWrapper from '../../ui/asyncWrapper';
import Greeting from '../../ui/greeting';
import Button from '../../ui/button';

export default view(({ model, dispatch }) => (
  <AsyncWrapper>
    {!model && <Button text="Fetch" onClick={() => dispatch({ type: 'Fetch' })} />}
    {!!model && <Greeting>{model}</Greeting>}
  </AsyncWrapper>
));
