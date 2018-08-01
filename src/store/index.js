// This is redux magic.  Ignore!

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
// import { autoRehydrate } from 'redux-persist';
import rootReducer from '../modules';
import { createTracker } from 'redux-segment';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
const tracker = createTracker();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger, tracker) /*autoRehydrate()*/));

export default store;

/**
 * Register async loaded reducers in store and replace
 * current state-reducer with the a new reducer
 *
 * @export
 * @param {Object} store - the store object
 * @param {Object} asyncReducer - async reducer modules
 */
store.asyncReducers = {};

function replaceReducers(defaultReducers) {
  const merged = Object.assign({}, defaultReducers, store.asyncReducers);
  const combined = combineReducers(merged);
  store.replaceReducer(combined);
}

export function injectAsyncReducers(asyncReducers) {
  const injectReducers = Object.keys(asyncReducers).reduce((all, item) => {
    if (store.asyncReducers[item]) {
      delete all[item];
    }

    return all;
  }, asyncReducers);

  store.asyncReducers = Object.assign({}, store.asyncReducers, injectReducers);
  replaceReducers(rootReducer);
}

// hot reloading for reducers
if (module.hot) {
  module.hot.accept('../modules', () => {
    const nextReducer = require('../modules').default; // eslint-disable-line

    replaceReducers(nextReducer);
  });
}
