// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {
  records: [
    { participant: 'nico', score: 23, date: 1 },
    { participant: 'nico', score: 33, date: 2 },
    { participant: 'nath', score: 31, date: 1 },
    { participant: 'nath', score: 41, date: 2 },
  ],
};

const actions = {
  // [ADD_PARTICIPANT]: (state, action) => {
  //   return Object.assign({}, state, { participants, scores });
  // },
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};
