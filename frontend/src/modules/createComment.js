import uuidv4 from 'uuid/v4';
import api from '../utils/api';

// Constants
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

// Actions
export const createCommentRequest = () => ({
  type    : CREATE_COMMENT_REQUEST,
});

export const createCommentSuccess = data => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: data,
});

export const createCommentFailure = error => ({
  type: CREATE_COMMENT_FAILURE,
  payload: {
    ...error,
  },
});

export const createCommentAsync = (values, postId) => (dispatch) => {
  const newValues = Object.assign({}, values, {
    id: uuidv4(),
    timestamp: Date.now(),
    parentId: postId,
    // body,
    // author,
    // parentId,
  });
  dispatch({ type: CREATE_COMMENT_REQUEST });

  return api.post('comments', newValues)
    .then(() => dispatch({ type: CREATE_COMMENT_SUCCESS }))
    .catch((err) => {
      dispatch({ type: CREATE_COMMENT_FAILURE });
      throw err;
    });
};

// Action Handles
const ACTION_HANDLERS = {
  [CREATE_COMMENT_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [CREATE_COMMENT_SUCCESS]: state => Object.assign({}, state, {
    fetching: false,
    error: null,
  }),
  [CREATE_COMMENT_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
};

const createCommentReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default createCommentReducer;
