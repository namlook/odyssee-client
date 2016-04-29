
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
  (name) => ({ initialState, actions }) => (state = initialState, action) => {
    if (action._storeName !== name) return state;
    const actionFn = actions[action.type];
    return actionFn ? actionFn(state, action) : state;
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
