import React from 'react';
import { view } from 'redux-elm';

import ViewWrapper from '../../ui/native/viewWrapper.native';
import Button from '../../ui/native/button.native';
import Greeting from '../../ui/native/greeting.native';

export default view(({ model, dispatch }) => (
  <ViewWrapper>
    {!model && <Button onPress={() => dispatch({ type: 'Fetch' })} text="Fetch" />}
    {!!model && <Greeting>{model}</Greeting>}
  </ViewWrapper>
));
