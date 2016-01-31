import { createStore } from 'redux';
import { createEffectCapableStore } from 'redux-side-effects';

import masterReducer from '../reducers/masterReducer';
import initialState from '../reducers/initialState';

const storeFactory = createEffectCapableStore(createStore);
const store = storeFactory(masterReducer, initialState);
export
{
    store
};
