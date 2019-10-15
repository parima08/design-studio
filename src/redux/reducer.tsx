import createReducer from './create-reducer';

const initialState = {
  isLoggedIn: false,
};

const handlers = {
  LOGGED_IN: (state) => ({
    ...state,
    isLoggedIn: true,
  }),
  LOGGED_OUT: (state) => ({
    ...state,
    isLoggedIn: false,
  })
};

export default createReducer(initialState, handlers);
