import { combineReducers } from 'redux';
import collection from './collection';

const rootReducer = combineReducers({
  outlet: (state, action) => (state == null ? [] : state),
  collection,
});

export default rootReducer;
