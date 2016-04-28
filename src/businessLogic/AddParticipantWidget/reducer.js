
// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {};

const actions = {
  ["ADD_PARTICIPANT"]: (state, action) => {
    console.log('AddParticipantWidget state>', state);
    return state;
  },
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};
