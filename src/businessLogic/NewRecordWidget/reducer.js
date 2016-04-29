
import { CLEAR, CHANGE } from './constants';

const initialState = {
  value: '',
};

const actions = {
  [CLEAR]: (state) => ({ ...state, value: '' }),
  [CHANGE]: (state, { value }) => ({ ...state, value }),
};

export default { initialState, actions };
