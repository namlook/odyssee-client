
import { combineReducers } from 'redux';

// ICI, DETECTER LES STORES ET LES COMBINER

import application from '../application/reducers';
import resources from '../resources/reducers';

const rootReducer = combineReducers({
  application,
  resources,
});

export default rootReducer;
