import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import SPFxReducer from '../reducers/SPFxReducer';
import { ListState } from '../state/SPFxState';

const loggerMiddleware = createLogger();

export default function configureStore() {

  //do not use loggerMiddleware in production
  const listSateStore: Store<ListState> = createStore<ListState>(SPFxReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

  return listSateStore;
}
