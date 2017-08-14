import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { persistStore, autoRehydrate } from 'redux-persist-immutable';
// import localForage from 'localforage';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

import globalSagas from './containers/App/sagas';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger'); // eslint-disable-line global-require
    const reduxLogger = createLogger({
      diff: true,
    });
    middlewares.push(reduxLogger);
  }

  // Do not use redux-persist
  const enhancers = [applyMiddleware(...middlewares)];

  // Use redux-persist
  // const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Use redux-persist
  // persistStore(store, { storage: localForage });

  // run global sagas
  globalSagas.map(saga => {
    sagaMiddleware.run(saga);
  });

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
