
import { combineReducers } from 'redux';
import { extractReducers } from './core';

import structure from './config/structure';
import register from './register';

export default combineReducers(extractReducers(structure, register));
