import api from '../utils/api';

// Constants
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

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
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
};

const postSummaryReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default postSummaryReducer;
