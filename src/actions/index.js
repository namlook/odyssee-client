
// TODO BUILD THIS DYNAMICALLY

import * as weatherCheckWidgetActions from '../businessLogic/WeatherCheckWidget/actions';
import * as newRecordWidgetActions from '../businessLogic/NewRecordWidget/actions';
import * as collectionStoreActions from '../businessLogic/CollectionStore/actions';


/** TODO put this in CORE **/

const actionCreator = (_storeName, action) => (variables) => ({
  ...action(variables),
  _storeName,
});

const createStoreActions = (actions) => (storeName) => (
  Object.keys(actions)
    .map((actionName) => ({
      name: actionName,
      fn: actionCreator(storeName, actions[actionName]),
    }))
    .reduce((acc, action) => ({ ...acc, [action.name]: action.fn }), {})
);

const createActions = (actions) => () => actions;

/** ************************ **/


export default {
  WeatherCheckWidget: createActions(weatherCheckWidgetActions),
  NewRecordWidget: createActions(newRecordWidgetActions),
  'participants-store': createStoreActions(collectionStoreActions),
  'other-participants-store': createStoreActions(collectionStoreActions),
};
