import { combineReducers } from 'redux';
import contact from './contact.js';

const rootReducer = combineReducers({
  outlet: (state, action) => (state == null ? [] : state),
  contact,
});

export default rootReducer;
