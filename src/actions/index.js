
// TODO BUILD THIS DYNAMICALLY

// import * as weatherCheckWidgetActions from '../businessLogic/WeatherCheckWidget/actions';
// import * as newRecordWidgetActions from '../businessLogic/NewRecordWidget/actions';
// import * as collectionStoreActions from '../businessLogic/CollectionStore/actions';
// import * as orderedCollectionStoreActions from '../businessLogic/OrderedCollectionStore/actions';


import register from '../register';
import structure from '../config/structure';
import { extractActions } from '../core';


// const widgetActions = extractWidgetActions(structure);
// const storeActions = extractStoreActions(structure);

export default extractActions(structure, register);

// export default {
//   'weather-in-montpellier': createActions(weatherCheckWidgetActions),
//   'add-participant': createActions(newRecordWidgetActions),
//   'participants-store': createActions(orderedCollectionStoreActions),
//   'other-participants-store': createActions(collectionStoreActions),
// };
