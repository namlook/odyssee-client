
import { ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from './constants';

export const addRecord = (_id, attributes) => ({ type: ADD_RECORD, _id, attributes });
export const updateRecord = (_id, attributes) => ({ type: UPDATE_RECORD, _id, attributes });
export const deleteRecord = (_id) => ({ type: DELETE_RECORD, _id });
