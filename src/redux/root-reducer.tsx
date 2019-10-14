import { combineReducers } from 'redux';
import sharedReducer from './reducer';

export default combineReducers({
  shared:  sharedReducer,
});
