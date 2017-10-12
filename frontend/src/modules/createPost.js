// Constants
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Actions
export const createPostAsync = () => (dispatch) => {
  console.log('CREATE_POST_ASYNC');
  dispatch({ type: CREATE_POST_REQUEST });
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
