
// TODO BUILD THIS DYNAMICALLY

// import * as weatherCheckWidgetActions from '../businessLogic/WeatherCheckWidget/actions';
// import * as newRecordWidgetActions from '../businessLogic/NewRecordWidget/actions';
// import * as collectionStoreActions from '../businessLogic/CollectionStore/actions';
// import * as orderedCollectionStoreActions from '../businessLogic/OrderedCollectionStore/actions';


import { createActions } from '../core';
import { extractWidgets, extractStores, pascalCase } from '../core/utils/core';

import register from '../register';
import structure from '../config/structure';


/** TODO add this to the CORE **/
const extractWidgetActions = (struct) => (
  extractWidgets(struct)
    .map((widget) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const actions = register.widgets[widgetName].actions;
      return actions ? { name: widget.name, actionCreator: createActions(actions) } : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.actionCreator } : acc), {})
);


const extractStoreActions = (struct) => (
  extractStores(struct).map((store) => {
    const storeName = `${pascalCase(store.type)}Store`;
    const storeConfig = register.stores[storeName];
    if (!storeConfig) {
      throw new Error(`unregistered store ${storeName}`);
    }
    const actions = register.stores[storeName].actions;
    return actions ? { name: store.name, actionCreator: createActions(actions) } : null;
  })
  .reduce((acc, item) => (item ? { ...acc, [item.name]: item.actionCreator } : acc), {})
);

const widgetActions = extractWidgetActions(structure);
const storeActions = extractStoreActions(structure);

export default { ...widgetActions, ...storeActions };

// export default {
//   'weather-in-montpellier': createActions(weatherCheckWidgetActions),
//   'add-participant': createActions(newRecordWidgetActions),
//   'participants-store': createActions(orderedCollectionStoreActions),
//   'other-participants-store': createActions(collectionStoreActions),
// };
