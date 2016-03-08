import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Application from './components/Application';
import FooPage from './components/FooPage';
import BarPage from './components/BarPage';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={Application}>
    <IndexRedirect to="foo" />
    <Route path="foo" component={FooPage} />
    <Route path="bar" component={BarPage} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
