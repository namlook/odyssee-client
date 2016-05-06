
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import _ from 'lodash';

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
// const _registerActions = (dispatch, _actions) => (
//   Object.keys(_actions).reduce((acc, actionName) => ({
//     ...acc,
//     [actionName]: bindActionCreators(_actions[actionName](actionName), dispatch),
//   }), {})
// );

export default (_actions, linkedStores) => (
  /* expose only the actions used in linked store
   */
  connect(
    (state) => (
      /* expose only the actions used in linked store
       */
      Object.keys(linkedStores).reduce((acc, name) => ({
        ...acc,
        [`${name}Store`]: state[linkedStores[name]],
      }), {})
    ),
    (dispatch) => (
      Object.keys(linkedStores).reduce((acc, name) => {
        const storeName = linkedStores[name];
        return {
          ...acc,
          [`${name}Actions`]: bindActionCreators(_actions[storeName](storeName), dispatch),
        };
      }, {})
    ),
  )
);
