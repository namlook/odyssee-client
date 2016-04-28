
import { combineReducers } from 'redux';

// ICI, DETECTER LES STORES ET LES COMBINER

import scores from './scores/reducers';
import participants from './participants/reducers';

const rootReducer = combineReducers({
  outlet: (state, action) => (state == null ? [] : state),
  scores,
  participants,
});

export default rootReducer;
