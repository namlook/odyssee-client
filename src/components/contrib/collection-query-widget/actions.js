
import { FETCH_REQUEST } from './constants';
// import { FETCH_REQUEST, FETCH_FAIL, FETCH_SUCCESS } from './constants';
import { createAction } from '../../../utils';

import { addBulkRecords } from '../../../stores/collection-store/actions';
import { pushMessage } from '../flash-messages-widget/actions';

const fetchRequested = createAction(FETCH_REQUEST);
// const fetchSucceed = createAction(FETCH_SUCCESS, 'payload');
// const fetchFailed = createAction(FETCH_FAIL, 'error');

// const fetchRequested = (_storeName) => () => ({ type: FETCH_REQUEST, _storeName, });
// const fetchSucceed = (_storeName) => (data) =>
// ({ type: FETCH_SUCCESS, payload: data, _storeName });
// const fetchFailed = (_storeName) => (error) => ({ type: FETCH_FAIL, error, _storeName });

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const fetchData = (storeName, storeConfig) => {
  const fetchRequestedAction = fetchRequested(storeName);

  const addBulkRecordsAction = addBulkRecords(storeConfig.linkedStores.collection);
  const pushMessageAction = pushMessage(storeConfig.linkedStores.message);

  return () => (dispatch) => {
    dispatch(fetchRequestedAction());

    return window.fetch(storeConfig.remote.endpoint)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        dispatch(pushMessageAction({
          title: 'ok',
          body: 'heyad',
          type: 'success',
        }));
        dispatch(pushMessageAction({
          title: 'info',
          body: 'skfjsklj',
          type: 'info',
        }));
        dispatch(addBulkRecordsAction(data.data));
      })
      .catch((error) => {
        dispatch(pushMessageAction({
          title: 'An error occured',
          body: `${error}`,
          type: 'error',
        }));
      });
  };
};
