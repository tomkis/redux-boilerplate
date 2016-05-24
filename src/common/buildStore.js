import { compose, createStore } from 'redux';
import reduxElm from 'redux-elm';

const identity = v => v;

// It makes sense to use DevTools
// only in development, also this function
// may potentially be used from the server,
// therefore we need to be sure that we are on client
// by checking type of window
const getDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'object' && !!window.devToolsExtension) {
      return window.devToolsExtension();
    } else {
      return identity;
    }
  } else {
    return identity;
  }
};

export default (reducer, initialAppState = {
  root: undefined,
  routing: undefined
}) => {
  const storeFactory = compose(
    reduxElm,
    getDevTools()
  )(createStore);

  return storeFactory(reducer, {
    ...initialAppState,
    routing: undefined
  });
};
