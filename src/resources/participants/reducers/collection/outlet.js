// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {
  records: [
    { _id: 'nico', name: 'Nico' },
    { _id: 'nath', name: 'Nath' },
    { _id: 'thib', name: 'Thib' },
  ],
};

const actions = {
  ["ADD_PARTICIPANT"]: (state, action) => {
    console.log('participant.collection.outlet state>', state);
    return state;
  },
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};
