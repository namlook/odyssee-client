
// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {
  foo: 'index',
};

const actions = {
  ["ADD_PARTICIPANT"]: (state, action) => {
    console.log('AddParticipantWidget state>', state);
    return state;
  },
};

export default { initialState, actions };
