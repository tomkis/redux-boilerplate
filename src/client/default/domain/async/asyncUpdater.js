import { Updater } from 'redux-elm';
import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as Effects from './asyncEffects';

export const initialModel = null;

function* saga() {
  yield* takeEvery('Fetch', function*() {
    try {
      const greeting = yield call(Effects.helloAsync);
      yield put({ type: 'Fetched', greeting });
    } catch (ex) {
      console.log('Error while calling API');
    }
  });
}

export default new Updater(initialModel, saga)
  .case('Fetched', (model, { greeting }) => greeting)
  .toReducer();
