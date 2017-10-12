import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { reducer as formReducer } from 'redux-form';
import counterReducer from '../modules/counter';

const reducer = combineReducers({
  counter: counterReducer,
  form: formReducer,
});

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(thunk, logger),
    autoRehydrate(),
  ),
);

// 全てのreducerのstateが永続化される
// 永続化したくないstateはblacklistに登録する
const blacklist = [
  // 'counter',
];

persistStore(store, {
  storage: asyncSessionStorage,
  blacklist,
}, () => {
  console.log('rehydration complete');
});

export default store;
