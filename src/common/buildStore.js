import { compose, createStore } from 'redux';
import reduxElm from 'redux-elm';

const identity = v => v;

const getDevTools = DevTools => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'object' && !!window.devToolsExtension) {
      return window.devToolsExtension();
    } else {
      return DevTools.instrument();
    }
  } else {
    return identity;
  }
};

export default (updater, DevTools) => {
  const storeFactory = compose(
    reduxElm,
    getDevTools(DevTools)
  )(createStore);

  return storeFactory(updater);
};
