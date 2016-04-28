// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {
  foo: 'index',
};

const actions = {
  ["ADD_PARTICIPANT"]: (state, action) => {
    console.log('participant.collection.index state>', state);
    return state;
  },
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};
