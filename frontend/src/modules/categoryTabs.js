import api from '../utils/api';

// Constants
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

// Actions
export const categoriesRequest = () => ({
  type    : CATEGORIES_REQUEST,
});

export const categoriesSuccess = categories => ({
  type: CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

export const categoriesFailure = error => ({
  type: CATEGORIES_FAILURE,
  payload: {
    ...error,
  },
});

export const categoriesAsync = () => (dispatch) => {
  dispatch(categoriesRequest());

  return api.get('categories').then((res) => {
    console.log(res.data.categories);
    dispatch(categoriesSuccess(res.data.categories));
    // this.setState({
    //   categories: res.data.categories,
    // });
  });
};

// Action Handles
const ACTION_HANDLERS = {
  [CATEGORIES_REQUEST]: state => Object.assign({}, state, {
    fetching: true,
    error: null,
  }),
  [CATEGORIES_SUCCESS]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: null,
    categories: action.payload.categories,
  }),
  [CATEGORIES_FAILURE]: (state, action) => Object.assign({}, state, {
    fetching: false,
    error: action.payload,
  }),
};

// Reducer
const initialState = {
  fetching: false,
  error: null,
  categories: [],
};

const categoryTabsReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default categoryTabsReducer;
