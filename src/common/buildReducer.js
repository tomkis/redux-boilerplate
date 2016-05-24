import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default updater => combineReducers({
  root: updater,
  routing: routerReducer
});
