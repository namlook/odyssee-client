
import { SAVE, CLEAR, CHANGE } from './constants';

import _ from 'lodash';

const initialState = {
  value: '',
};

const actions = {
  [SAVE]: (state) => ({ ...state, value: '' }),
  [CLEAR]: (state) => ({ ...state, value: '' }),
  [CHANGE]: (state, { value }) => ({ ...state, value }),
};

export default { initialState, actions };
