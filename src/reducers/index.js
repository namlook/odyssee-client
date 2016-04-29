
import { combineReducers } from 'redux';

// ICI, DETECTER LES STORES ET LES COMBINER

// import application from '../application/reducers';
// import resources from '../resources/reducers';

import WeatherInMontpellier from '../businessLogic/WeatherCheckWidget/reducer';
import NewRecordWidget from '../businessLogic/NewRecordWidget/reducer';
import CollectionStore from '../businessLogic/CollectionStore/reducer';

/** TODO put this in CORE **/

const createStoreReducer = (name) => ({ initialState, actions }) =>
  (state = initialState, action) => {
    if (action._storeName !== name) return state;
    const actionFn = actions[action.type];
    return actionFn ? actionFn(state, action) : state;
  };

const createReducer = ({ initialState, actions }) => (state = initialState, action) => {
  console.log('...', initialState, actions, state);
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};

/** ******************* **/


const rootReducer = combineReducers({
  // application,
  // resources,
  'weather-in-montpellier': createReducer(WeatherInMontpellier),
  'add-participant': createReducer(NewRecordWidget),
  'participants-store': createStoreReducer('participants-store')(CollectionStore),
  'other-participants-store': createStoreReducer('other-participants-store')(CollectionStore),
});

export default rootReducer;
