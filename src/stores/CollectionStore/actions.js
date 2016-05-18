
import { ADD_RECORD, UPDATE_RECORD, DELETE_RECORD, DELETE_ALL } from './constants';

export const addRecord = (record) => ({ type: ADD_RECORD, record });
export const updateRecord = (_id, attributes) => ({ type: UPDATE_RECORD, _id, attributes });
export const deleteRecord = (_id) => ({ type: DELETE_RECORD, _id });
export const deleteAll = () => ({ type: DELETE_ALL });
