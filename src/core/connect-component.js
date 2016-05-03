
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** export default connect(
//   (state) => {
//     console.log('!!state', this);
//     return { storeState: state };
//   },
//   (dispatch) => ({
//     storeActions: {
//       WeatherCheckWidget: bindActionCreators(_actions.WeatherCheckWidget, dispatch),
//       NewRecordWidget: bindActionCreators(_actions.NewRecordWidget, dispatch),
//       'participants-store': bindActionCreators(
//         _actions.collectionStore('participants-store'),
//         dispatch,
//       ),
//       'other-participants-store': bindActionCreators(
//         _actions.collectionStore('other-participants-store'),
//         dispatch,
//       ),
//     },
//   }),
// )(ApplicationContactPage);
**/
export default (actions) => {
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
