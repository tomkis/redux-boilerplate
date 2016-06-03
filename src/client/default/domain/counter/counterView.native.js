import React from 'react';
import { view } from 'redux-elm';

import ViewWrapper from '../../ui/native/viewWrapper.native';
import Button from '../../ui/native/button.native';

export default view(({ model, dispatch }) => (
  <ViewWrapper>
    <Button text={`Clicked ${model}x`} onPress={() => dispatch({ type: 'Increment' })} />
  </ViewWrapper>
));
