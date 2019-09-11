import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import promise from "redux-promise-middleware"
import reducer from './globals/index';
import window from './globals/window';
import rootSaga from './globals/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, thunk, logger);

const enhancers = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(reducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;
