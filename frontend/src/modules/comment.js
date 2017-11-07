import api, { apiClient } from '../utils/api';

// Constants
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_EXISTING_DATA = 'LOAD_EXISTING_DATA';

// Actions
export const voteAsync = (commentId, voteType) => (dispatch) => {
  const newValues = Object.assign({}, {
    option: voteType,
  });
  dispatch({ type: VOTE_REQUEST });

  return api.post(`comments/${commentId}`, newValues)
    .then(() => dispatch({ type: VOTE_SUCCESS }))
    .catch((err) => {
      dispatch({ type: VOTE_FAILURE });
      throw err;
    });
};

export const editCommentRequest = () => ({
  type    : EDIT_COMMENT_REQUEST,
});

export const editCommentSuccess = data => ({
  type: EDIT_COMMENT_SUCCESS,
  payload: data,
});

export const editCommentFailure = error => ({
  type: EDIT_COMMENT_FAILURE,
  payload: {
    ...error,
  },
});

export const editCommentAsync = (commentId, body, timestamp) => (dispatch) => {
  const newValues = Object.assign({}, {
    body,
    timestamp,
  });
  dispatch({ type: EDIT_COMMENT_REQUEST });

  return api.put(`comments/${commentId}`, newValues)
    .then(() => dispatch({ type: EDIT_COMMENT_SUCCESS }))
    .catch((err) => {
      dispatch({ type: EDIT_COMMENT_FAILURE });
      throw err;
    });
};

export const removeCommentRequest = () => ({
  type    : REMOVE_COMMENT_REQUEST,
});

export const removeCommentSuccess = data => ({
  type: REMOVE_COMMENT_SUCCESS,
  payload: data,
});

export const removeCommentFailure = error => ({
  type: REMOVE_COMMENT_FAILURE,
  payload: {
    ...error,
  },
});

export const removeCommentAsync = commentId => (dispatch) => {
  dispatch({ type: REMOVE_COMMENT_REQUEST });

  return apiClient.delete(`comments/${commentId}`)
    .then(() => dispatch({ type: REMOVE_COMMENT_SUCCESS }))
    .catch((err) => {
      dispatch({ type: REMOVE_COMMENT_FAILURE });
      throw err;
    });
};

export const loadExistingData = data => ({
  type: LOAD_EXISTING_DATA,
  payload: data,
});

// Action Handles
const ACTION_HANDLERS = {
  [VOTE_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [VOTE_SUCCESS]: state => Object.assign({}, state, {
    fetching: false,
    error: null,
  }),
  [VOTE_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
  [REMOVE_COMMENT_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [EDIT_COMMENT_SUCCESS]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: null,
    // comments: action.payload,
  }),
  [EDIT_COMMENT_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
  [REMOVE_COMMENT_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [REMOVE_COMMENT_SUCCESS]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: null,
    comments: action.payload,
  }),
  [REMOVE_COMMENT_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
  [LOAD_EXISTING_DATA]: (state, action) => {
    console.log(action.payload);
    return Object.assign({}, state, {
      ...action.payload,
    });
  },
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
  existingData: {},
};

const commentReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default commentReducer;
