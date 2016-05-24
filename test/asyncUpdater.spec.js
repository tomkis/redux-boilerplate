import { assert } from 'chai';
import asyncUpdater from '../src/client/default/domain/async/asyncUpdater';

describe('async updater', () => {
  it('should set greeting as model after Fetched action', () => {
    const greeting = 'Foo Bar';

    let model = asyncUpdater();
    model = asyncUpdater(model, {
      type: 'Fetched',
      greeting
    });

    assert.equal(model, greeting);
  });
});
