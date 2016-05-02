
import { combineReducers } from 'redux';
import { createReducer } from '../core';

// ICI, DETECTER LES STORES ET LES COMBINER

// import application from '../application/reducers';
// import resources from '../resources/reducers';

import WeatherInMontpellier from '../businessLogic/WeatherCheckWidget/reducer';
import NewRecordWidget from '../businessLogic/NewRecordWidget/reducer';
import CollectionStore from '../businessLogic/CollectionStore/reducer';
import OrderedCollectionStore from '../businessLogic/OrderedCollectionStore/reducer';

const rootReducer = combineReducers({
  // application,
  // resources,
  'weather-in-montpellier': createReducer('weather-in-montpellier', [])(WeatherInMontpellier),
  'add-participant': createReducer('add-participant', [])(NewRecordWidget),
  'participants-store': createReducer('participants-store', [])(OrderedCollectionStore),
  'other-participants-store': createReducer('other-participants-store', [])(CollectionStore),
});

export default rootReducer;
