import {applyMiddleware, createStore} from 'redux';
import formalityReducer from '../Formality/reducer';
import {fromJS, isImmutable, Map} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {exampleSaga} from '../sagas/exampleSaga';

const makeStore = (_INITIAL_STATE = null) => {
  const sagas = [exampleSaga];
  let INITIAL_STATE = _INITIAL_STATE === null ? Map({}) : _INITIAL_STATE;
  if (!isImmutable(INITIAL_STATE)) {
    INITIAL_STATE = fromJS(INITIAL_STATE);
  }
  console.log(INITIAL_STATE);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = composeWithDevTools({
      name: 'Bloc - Redux store'
    });
    const store = createStore(formalityReducer, INITIAL_STATE, composeEnhancers(
      applyMiddleware(...middleware)
    ));
    sagas.forEach(saga => sagaMiddleware.run(saga));
    return store;
  }
  const store = createStore(formalityReducer, INITIAL_STATE, applyMiddleware(sagaMiddleware));
  sagas.forEach(saga => sagaMiddleware.run(saga));
  return store;

};

export default makeStore;
