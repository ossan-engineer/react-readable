import uuidv4 from 'uuid/v4'
import api from '../utils/api';

// Constants
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Actions
export const createPostAsync = values => (dispatch) => {
  const newValues = Object.assign({}, values, {
    id: uuidv4(),
    timestamp: Date.now(),
  });
  dispatch({ type: CREATE_POST_REQUEST });

  return api.post('posts', newValues)
    .then(() => dispatch({ type: CREATE_POST_SUCCESS }))
    .catch((err) => {
      dispatch({ type: CREATE_POST_FAILURE })
      throw err;
    });
};

// Action Handles
const ACTION_HANDLERS = {
  [CREATE_POST_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [CREATE_POST_SUCCESS]: state => Object.assign({}, state, {
    fetching: false,
    error: null,
  }),
  [CREATE_POST_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
};

const createPostReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default createPostReducer;
