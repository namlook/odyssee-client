
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL } from './constants';
import { Map as iMap/* , List as iList, Record as iRecord*/ } from 'immutable';

export default (/* config */) => {
  const initialState = iMap({
    // query: iList(),
    loading: false,
    error: null,
  });

  const actions = {
    [FETCH_REQUEST]: (state) => (state.set('loading', true)),
    [FETCH_SUCCESS]: (state) => (state.set('loading', false)),
    [FETCH_FAIL]: (state, { payload }) => (
      state.set('loading', false).update('error', () => payload)
    ),
  };

  return { initialState, actions };
};
