import { Updater } from 'redux-elm';

import counterUpdater, { initialModel as counterInitialModel } from '../counter/counterUpdater';
import asyncUpdater, { initialModel as asyncInitialModel } from '../async/asyncUpdater';

const initialModel = {
  counter: counterInitialModel,
  async: asyncInitialModel
};

export default new Updater(initialModel)
  .case('Counter', (model, action) =>
    ({ ...model, counter: counterUpdater(model.counter, action) }))
  .case('Async', (model, action) =>
    ({ ...model, async: asyncUpdater(model.async, action) }))
  .toReducer();
