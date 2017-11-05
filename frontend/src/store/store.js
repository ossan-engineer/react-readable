import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { reducer as formReducer } from 'redux-form';
import categoryTabsReducer from '../modules/categoryTabs';
import createPostReducer from '../modules/createPost';
import postSummaryReducer from '../modules/postSummary';
import postDetailReducer from '../routes/Posts/modules/postDetail';
import commentReducer from '../modules/comment';
import createCommentReducer from '../modules/createComment';

const reducer = combineReducers({
  form: formReducer,
  createPost: createPostReducer,
  postSummary: postSummaryReducer,
  postDetail: postDetailReducer,
  comment: commentReducer,
  createComment: createCommentReducer,
  categoryTabs: categoryTabsReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunk),
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
