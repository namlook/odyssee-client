
import _ from 'lodash';
import {
  CLEAR,
  UPDATE,
  UPDATE_PROPERTY,

  FETCH_REQUEST,
  FETCH_FAIL,
  FETCH_SUCCESS,
  SAVE_REQUEST,
  SAVE_FAIL,
  SAVE_SUCCESS,
} from './constants';
import { createAction } from '../../utils';
const { fetch } = window;

export const updateProperty = createAction(UPDATE_PROPERTY, 'property', 'value');
export const update = createAction(UPDATE, 'record');
export const clear = createAction(CLEAR);

export const fetchRequest = createAction(FETCH_REQUEST);
export const fetchFail = createAction(FETCH_FAIL);
export const fetchSuccess = createAction(FETCH_SUCCESS);

export const saveRequest = createAction(SAVE_REQUEST);
export const saveFail = createAction(SAVE_FAIL);
export const saveSuccess = createAction(SAVE_SUCCESS);

import { pushMessage } from '../../components/contrib/flash-messages-widget/actions';

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

  const updateAction = update(storeName);
  const messageStoreName = _.get(storeConfig, 'linkedStores.message');
  const pushMessageAction = messageStoreName ? pushMessage(messageStoreName) : null;


  // TODO: linked query-filter here

  return (recordId) => (dispatch) => {
    dispatch(fetchRequestAction());

    const { endpoint } = storeConfig.remote;

    const url = endpoint.replace(':id', recordId);
    console.log('fetching record', url, recordId);

    return fetch(url)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        console.log('record>', data);
        dispatch(fetchSuccessAction());
        dispatch(updateAction(data.data[0])); // TODO CHECK THIS: data.data
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

export const saveData = (storeName, storeConfig) => {
  const saveRequestAction = saveRequest(storeName);
  const saveFailAction = saveFail(storeName);
  const saveSuccessAction = saveSuccess(storeName);
  const updateAction = update(storeName);

  const messageStoreName = _.get(storeConfig, 'linkedStores.message');
  const pushMessageAction = messageStoreName ? pushMessage(messageStoreName) : null;


  // TODO: linked query-filter here

  return (data) => (dispatch) => {
    dispatch(saveRequestAction());
    // TODO create the post payload with data
    return fetch(storeConfig.remote.endpoint, data)
      .then(checkStatus)
      .then((response) => response.json())
      .then((savedData) => {
        // here the data with the _id generated if needed
        dispatch(saveSuccessAction());
        dispatch(updateAction(savedData.data)); // TODO CHECK THIS: data.data
      })
      .catch((error) => {
        dispatch(saveFailAction(error));
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
