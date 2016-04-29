
import { WHEATHER_CHANGE } from './constants';

import _ from 'lodash';

const initialState = {
  currentWeather: 'sunny',
};

const actions = {
  [WHEATHER_CHANGE]: (state, { status }) => ({ ...state, currentWeather: status }),
};

export default { initialState, actions };
