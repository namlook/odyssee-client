
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

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
const _registerActions = (dispatch, _actions) => (
  Object.keys(_actions).reduce((acc, actionName) => ({
    ...acc,
    [actionName]: bindActionCreators(_actions[actionName](actionName), dispatch),
  }), {})
);

export default (_actions, storesName) => {
  /* expose only the actions used in linked store
   */
  const actions = _.pick(_actions, storesName);

  return connect(
    (state) => {
      /* expose only the actions used in linked store
       */
      const subState = _.pick(state, storesName);
      return {
        storeState: subState,
      };
    },
    (dispatch) => ({
      storeActions: _registerActions(dispatch, actions),
    }),
  );
};
