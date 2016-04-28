import { combineReducers } from 'redux';
import collection from './collection/index.js';

const rootReducer = combineReducers({
  outlet: (state, action) => (state == null ? [] : state),
  collection,
});

export default rootReducer;
