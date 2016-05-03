
import { combineReducers } from 'redux';
import { createReducer } from '../core';

// ICI, DETECTER LES STORES ET LES COMBINER

// import application from '../application/reducers';
// import resources from '../resources/reducers';

// import WeatherInMontpellier from '../businessLogic/WeatherCheckWidget/reducer';
// import NewRecordWidget from '../businessLogic/NewRecordWidget/reducer';
// import CollectionStore from '../businessLogic/CollectionStore/reducer';
// import OrderedCollectionStore from '../businessLogic/OrderedCollectionStore/reducer';


/** TODO add this to the CORE **/

import { extractWidgets, extractStores, pascalCase } from '../core/utils/core';
import register from '../register';

const extractWidgetReducers = (struct) => (
  extractWidgets(struct)
    .map((widget) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const reducer = register.widgets[widgetName].reducer;
      return reducer
        ? { name: widget.name, reducerCreator: createReducer(widget.name)(reducer) }
        : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.reducerCreator } : acc), {})
);

const extractStoreReducers = (struct) => (
  extractStores(struct)
    .map((store) => {
      const storeName = `${pascalCase(store.type)}Store`;
      const storeConfig = register.stores[storeName];
      if (!storeConfig) {
        throw new Error(`unregistered store ${storeName}`);
      }
      const reducer = register.stores[storeName].reducer;
      return reducer
        ? { name: store.name, reducerCreator: createReducer(store.name)(reducer) }
        : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.reducerCreator } : acc), {})
);

const extractReducers = (struct) => ({
  ...extractWidgetReducers(struct),
  ...extractStoreReducers(struct),
});

/** ************* **/

import structure from '../config/structure';

export default combineReducers(extractReducers(structure));

// const rootReducer = combineReducers({
//   // application,
//   // resources,
//   'weather-in-montpellier': createReducer('weather-in-montpellier', [])(WeatherInMontpellier),
//   'add-participant': createReducer('add-participant', [])(NewRecordWidget),
//   'participants-store': createReducer('participants-store', [])(OrderedCollectionStore),
//   'other-participants-store': createReducer('other-participants-store', [])(CollectionStore),
// });

// export default rootReducer;
