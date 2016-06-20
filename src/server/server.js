import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import 'isomorphic-fetch';

import buildStore from '../common/buildStore';
import buildReducer from '../common/buildReducer';
import buildRouting from '../client/default/domain/root/buildRouting';
import rootUpdater from '../client/default/domain/root/rootUpdater';
import template from './template';

const app = express();

// put your DATABASE_URI etc. into config files
import config from './config';

app.use('/', express.static('dist/client'));
app.get('/hello', (req, res) => res.json({
  hello: config.default.HELLO_MESSAGE
}));

app.get('/initial-counter', (req, res) => res.json({
  value: Math.round(Math.random() * 10)
}));


app.get('*', (req, res) => {
  const store = buildStore(buildReducer(rootUpdater));
  const history = syncHistoryWithStore(createMemoryHistory(), store);
  const routes = buildRouting(history, store.dispatch);

  store.dispatch({ type: '@@redux-elm/Mount' });

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const render = () => renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const timeout = setTimeout(() =>
        res
          .status(500)
          .send('Request has timed out'),
        1000
      );

      const unsubscribe = store.subscribe(() => {
        const { root: { prefetched } } = store.getState();

        if (prefetched) {
          clearTimeout(timeout);
          unsubscribe();

          store.dispatch({ type: 'SuppressFetching' });

          res
            .status(200)
            .send(template(
              render(),
              store.getState(),
              process.env.NODE_ENV === 'production'));
        }
      });

      render();
    } else {
      res
        .status(404)
        .send(process.env.NODE_ENV === 'development' ?
          'Please, provide wildcard handler for 404 pages' : '');
    }
  });
});

app.listen(process.env.PORT || 3000);
