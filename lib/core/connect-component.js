'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _redux = require('redux');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

exports.default = function (_actions, linkedStores) {
  return(
    /* expose only the actions used in linked store
     */
    (0, _reactRedux.connect)(function (state) {
      return(
        /* expose only the actions used in linked store
         */
        Object.keys(linkedStores).reduce(function (acc, name) {
          return _extends({}, acc, _defineProperty({}, name + 'Store', state[linkedStores[name]]));
        }, {})
      );
    }, function (dispatch) {
      return Object.keys(linkedStores).reduce(function (acc, name) {
        var storeName = linkedStores[name];
        return _extends({}, acc, _defineProperty({}, name + 'Actions', (0, _redux.bindActionCreators)(_actions[storeName](storeName), dispatch)));
      }, {});
    })
  );
};