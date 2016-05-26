
import { createAction } from '../../utils';
import {
  ADD_RECORD,
  ADD_BULK_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD,
  DELETE_ALL,
} from './constants';

export const addRecord = createAction(ADD_RECORD, 'record');
export const addBulkRecords = createAction(ADD_BULK_RECORDS, 'records');
export const updateRecord = createAction(UPDATE_RECORD, '_id', 'attributes'); // ??
export const deleteRecord = createAction(DELETE_RECORD, '_id');
export const deleteAll = createAction(DELETE_ALL);
