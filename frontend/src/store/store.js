import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { reducer as formReducer } from 'redux-form';
import categoryTabsReducer from '../modules/categoryTabs';
import createPostReducer from '../modules/createPost';
import postSummaryReducer from '../modules/postSummary';

const reducer = combineReducers({
  form: formReducer,
  createPost: createPostReducer,
  postSummary: postSummaryReducer,
  categoryTabs: categoryTabsReducer,
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
  'categoryTabs',
  // 'counter',
];

persistStore(store, {
  storage: asyncSessionStorage,
  blacklist,
}, () => {
  console.log('rehydration complete');
});

export default store;
