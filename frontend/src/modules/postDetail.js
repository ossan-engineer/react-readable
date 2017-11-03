import api, {apiClient} from '../utils/api';

// Constants
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_EXISTING_DATA = 'LOAD_EXISTING_DATA';

// Actions
export const voteAsync = (postId, voteType) => (dispatch) => {
  const newValues = Object.assign({}, {
    option: voteType,
  });
  dispatch({ type: VOTE_REQUEST });

  return api.post(`posts/${postId}`, newValues)
    .then(() => dispatch({ type: VOTE_SUCCESS }))
    .catch((err) => {
      dispatch({ type: VOTE_FAILURE });
      throw err;
    });
};

export const commentsRequest = () => ({
  type    : COMMENTS_REQUEST,
});

export const commentsSuccess = data => ({
  type: COMMENTS_SUCCESS,
  payload: data,
});

export const commentsFailure = error => ({
  type: COMMENTS_FAILURE,
  payload: {
    ...error,
  },
});

export const commentsAsync = postId => (dispatch) => {
  dispatch({ type: COMMENTS_REQUEST });

  return api.get(`posts/${postId}/comments`)
    .then((res) => {
      console.log(res);
      dispatch(commentsSuccess(res.data));
      return res.data
    })
    .catch((err) => {
      dispatch(commentsFailure(err));
      throw err;
    });
};

export const editPostRequest = () => ({
  type    : EDIT_POST_REQUEST,
});

export const editPostSuccess = data => ({
  type: EDIT_POST_SUCCESS,
  payload: data,
});

export const editPostFailure = error => ({
  type: EDIT_POST_FAILURE,
  payload: {
    ...error,
  },
});

export const editPostAsync = (postId, title, body) => (dispatch) => {
  const newValues = Object.assign({}, {
    title,
    body,
  });
  dispatch({ type: EDIT_POST_REQUEST });

  return api.put(`posts/${postId}`, newValues)
    .then(() => dispatch({ type: EDIT_POST_SUCCESS }))
    .catch((err) => {
      dispatch({ type: EDIT_POST_FAILURE });
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

export const removeCommentAsync = (commentId) => (dispatch) => {
  alert('HOGE');
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
  [COMMENTS_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [COMMENTS_SUCCESS]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: null,
    comments: action.payload,
  }),
  [COMMENTS_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
  [REMOVE_COMMENT_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [EDIT_POST_SUCCESS]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: null,
    comments: action.payload,
  }),
  [EDIT_POST_FAILURE]: (state, action) => Object.assign({}, state, {
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
  comments: [],
  existingData: {},
};

const postDetailReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default postDetailReducer;
