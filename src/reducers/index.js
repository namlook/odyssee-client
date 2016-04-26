import { combineReducers } from 'redux';
// import fuelSavingsAppState from './fuelSavings';
import app from './app';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;
