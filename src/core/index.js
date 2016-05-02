
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export const connectPage = (actions) => {
  const _registerActions = (dispatch, _actions) => (
    Object.keys(_actions)
      .map((actionName) => ({ name: actionName, fn: _actions[actionName] }))
      .reduce((acc, action) => ({
        ...acc,
        [action.name]: bindActionCreators(action.fn(action.name), dispatch),
      }), {})
  );

  return connect(
    (state) => ({
      storeState: state,
    }),
    (dispatch) => ({
      storeActions: _registerActions(dispatch, actions),
    }),
  );
};


export const createReducer =
  (name, dependencies) =>
    ({ initialState, actions, postProcess }) => (state = initialState, action) => {
      if (action._storeName !== name && (dependencies || []).indexOf(action._storeName) === -1) {
        return state;
      }
      const actionFn = actions[action.type];
      const newState = actionFn ? actionFn(state, action) : state;
      return postProcess ? postProcess(newState) : newState;
    };


const _addStoreNameToAction = (_storeName, action) => (...variables) => ({
  ...action(...variables),
  _storeName,
});

export const createActions = (actions) => (storeName) => (
  Object.keys(actions)
    .map((actionName) => ({
      name: actionName,
      fn: _addStoreNameToAction(storeName, actions[actionName]),
    }))
    .reduce((acc, action) => ({ ...acc, [action.name]: action.fn }), {})
);
