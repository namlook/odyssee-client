
// TODO BUILD THIS DYNAMICALLY

import * as weatherCheckWidgetActions from '../businessLogic/WeatherCheckWidget/actions';
import * as newRecordWidgetActions from '../businessLogic/NewRecordWidget/actions';
import * as collectionStoreActions from '../businessLogic/CollectionStore/actions';


import { createActions } from '../core';


export default {
  'weather-in-montpellier': createActions(weatherCheckWidgetActions),
  'add-participant': createActions(newRecordWidgetActions),
  'participants-store': createActions(collectionStoreActions),
  'other-participants-store': createActions(collectionStoreActions),
};
