import { createSelector } from 'reselect';

export const stateSelector = state => state.shared;

export const isLoggedInSelector = createSelector(
  [stateSelector],
  (state) => state.isLoggedIn
)