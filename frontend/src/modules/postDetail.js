import api from '../utils/api';

// Constants
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

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
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
  comments: [],
};

const postDetailReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default postDetailReducer;
