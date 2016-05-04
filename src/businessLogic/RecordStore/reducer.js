
import { CLEAR, UPDATE_PROPERTY } from './constants';
import { Record as iRecord } from 'immutable';

export default (config) => {
  const ScoreRecord = iRecord(config.schema);
  const initialState = new ScoreRecord();

  const actions = {
    [CLEAR]: () => initialState,
    [UPDATE_PROPERTY]: (state, { property, value }) => state.set(property, value),
  };

  return { initialState, actions };
};
