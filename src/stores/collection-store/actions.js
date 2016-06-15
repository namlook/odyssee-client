
import _ from 'lodash';
import { createAction } from '../../utils';
import {
  ADD_RECORD,
  ADD_BULK_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD,
  DELETE_ALL,
  FETCH_REQUEST,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from './constants';
const { fetch } = window;

export const addRecord = createAction(ADD_RECORD, 'record');
export const addBulkRecords = createAction(ADD_BULK_RECORDS, 'records');
export const updateRecord = createAction(UPDATE_RECORD, '_id', 'attributes'); // ??
export const deleteRecord = createAction(DELETE_RECORD, '_id');
export const deleteAll = createAction(DELETE_ALL);

import { pushMessage } from '../../components/contrib/flash-messages-widget/actions';

const fetchRequest = createAction(FETCH_REQUEST);
const fetchFail = createAction(FETCH_FAIL, 'error');
const fetchSuccess = createAction(FETCH_SUCCESS);

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const fetchData = (storeName, storeConfig) => {
  const fetchRequestAction = fetchRequest(storeName);
  const fetchFailAction = fetchFail(storeName);
  const fetchSuccessAction = fetchSuccess(storeName);

  const addBulkRecordsAction = addBulkRecords(storeName);
  const messageStoreName = _.get(storeConfig, 'linkedStores.message');
  const pushMessageAction = messageStoreName ? pushMessage(messageStoreName) : null;

  // TODO: linked query-filter here ? nop ! the url will be use for the state

  return (/* filter */) => (dispatch) => {
    dispatch(fetchRequestAction());

    const url = storeConfig.remote.endpoint;

    return fetch(url)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSuccessAction());
        dispatch(addBulkRecordsAction(data.data));
      })
      .catch((error) => {
        dispatch(fetchFailAction(error));
        if (pushMessageAction) {
          dispatch(pushMessageAction({
            title: 'An error occured',
            body: `${error}`,
            type: 'error',
          }));
        }
      });
  };
};
