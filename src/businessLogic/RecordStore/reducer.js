
import { CLEAR, UPDATE, UPDATE_PROPERTY } from './constants';
import { Record as iRecord } from 'immutable';

const castValue = (schema, property, value) => {
  if (schema[property] === 'number') return parseFloat(value);
  return value;
};

export default (config) => {
  const placeholder = Object.keys(config.schema).reduce(
    (acc, name) => ({ ...acc, [name]: '' }), {}
  );

  const ScoreRecord = iRecord(placeholder);
  const initialState = new ScoreRecord();

  const actions = {
    [CLEAR]: () => initialState,
    [UPDATE]: (state, { record }) => new ScoreRecord(record),
    [UPDATE_PROPERTY]: (state, { property, value }) => {
      const castedValue = castValue(config.schema, property, value);
      return state.set(property, castedValue);
    },
  };

  return { initialState, actions };
};
