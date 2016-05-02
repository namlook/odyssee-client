
import { WHEATHER_CHANGE } from './constants';

import { Map as iMap } from 'immutable';

const initialState = iMap({
  currentWeather: 'sunny',
});

const actions = {
  [WHEATHER_CHANGE]: (state, { status }) => state.set('currentWeather', status),
};

export default { initialState, actions };
