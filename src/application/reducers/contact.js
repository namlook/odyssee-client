// import { ADD_PARTICIPANT } from '../constants/actionTypes';

import _ from 'lodash';

const initialState = {};

const actions = {
  // [ADD_PARTICIPANT]: (state, action) => {
  //   return Object.assign({}, state, { participants, scores });
  // },
};

export default (state = initialState, action) => {
  const actionFn = actions[action.type];
  return actionFn ? actionFn(state, action) : state;
};
