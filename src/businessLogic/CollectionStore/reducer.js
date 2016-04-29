
import { ADD_RECORD } from './constants';

const initialState = {
  records: [],
};

const actions = {
  [ADD_RECORD]: (state, { record }) => ({
    ...state,
    records: [...state.records, record],
  }),
};

export default { initialState, actions };
