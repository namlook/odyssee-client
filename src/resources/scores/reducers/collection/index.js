
import { combineReducers } from 'redux';
import statistics from './statistics';
import outlet from './outlet';

const rootReducer = combineReducers({
  outlet,
  statistics,
});

export default rootReducer;
