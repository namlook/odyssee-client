
import { combineReducers } from 'redux';

import outlet from './collection/outlet';
import index from './collection/index';

const rootReducer = combineReducers({
  outlet,
  index,
});

export default rootReducer;
