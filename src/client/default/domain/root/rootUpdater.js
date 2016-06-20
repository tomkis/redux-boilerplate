import { Updater, wrapAction } from 'redux-elm';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import counterUpdater, { initialModel as counterInitialModel } from '../counter/counterUpdater';
import asyncUpdater, { initialModel as asyncInitialModel } from '../async/asyncUpdater';
import * as Routes from './routes';
import * as RootEffects from './rootEffects';

const initialModel = {
  counter: counterInitialModel,
  async: asyncInitialModel,
  prefetched: false,
  canFetch: true
};

function* fetchingSaga() {
  yield* takeEvery('UrlHasChanged', function*({ route }) {
    const canFetch = yield select(model => model.canFetch);

    if (canFetch) {
      try {
        switch (route) {
          case Routes.Counter: {
            const data = yield call(RootEffects.fetchInitialCounterValue);
            yield put(wrapAction({ type: 'Fetched', data }, 'Counter'));
            break;
          }

          default:
            console.log(`Route  ${route} does not fetch any data`);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        yield put({ type: 'Prefetched' });
      }
    } else {
      yield put({ type: 'ClearSuppressFetching' });
    }
  });
}

export default new Updater(initialModel, fetchingSaga)
  .case('Counter', (model, action) =>
    ({ ...model, counter: counterUpdater(model.counter, action) }))
  .case('Async', (model, action) =>
    ({ ...model, async: asyncUpdater(model.async, action) }))
  .case('Prefetched', model => ({ ...model, prefetched: true }))
  .case('SuppressFetching', model => ({ ...model, canFetch: false }))
  .case('ClearSuppressFetching', model => ({ ...model, canFetch: true }))
  .toReducer();
