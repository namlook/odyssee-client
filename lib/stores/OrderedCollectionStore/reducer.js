'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
// import { MOVE_UP, MOVE_DOWN } from './constants';
// import { ADD_RECORD } from '../CollectionStore/constants';
// import collectionStoreReducer from '../CollectionStore/reducer';
//
// export default (config) => {
//   const collectionStore = collectionStoreReducer(config);
//
//   const moveRecord = (content, _id, position) => {
//     const record = content.find((o) => o._id === _id);
//
//     if (record.position + position >= content.count() || record.position + position < 0) {
//       return content;
//     }
//
//     const upperRecord = content.find((o) => o.position === record.position + position);
//     const filteredRecords = content.filter((o) =>
//       o._id !== _id && o._id !== upperRecord._id
//     );
//
//     return filteredRecords
//       .push(record.set('position', record.position + position))
//       .push(upperRecord.set('position', upperRecord.position - position));
//   };
//
//   const actions = {
//     ...collectionStore.actions,
//     [ADD_RECORD]: (state, { record }) => {
//       const positionedRecord = record.set('position', state.get('content').count());
//       return collectionStore.actions[ADD_RECORD](state, { record: positionedRecord });
//     },
//     [MOVE_UP]: (state, { _id }) => state.update(
//       'content', (content) => moveRecord(content, _id, 1)
//     ),
//     [MOVE_DOWN]: (state, { _id }) => state.update(
//       'content', (content) => moveRecord(content, _id, -1)
//     ),
//   };
//
//   /** order the content after process **/
//   const postProcess = (state) => state.update('content', (content) =>
//     content.sort((o, o2) => o.position > o2.position)
//   );
//
//   return { initialState: collectionStore.initialState, actions, postProcess };
// };

var _constants = require('./constants');

var _reducer = require('../CollectionStore/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (config) {
  var _extends2;

  var collectionStore = (0, _reducer2.default)(config);

  var moveDownRecord = function moveDownRecord(content, _id) {
    var record = content.find(function (o) {
      return o._id === _id;
    });

    var currentRecordIndex = content.indexOf(record);
    if (currentRecordIndex < 1) return content;

    var results = content.slice(0, currentRecordIndex - 1).concat([record], content.slice(currentRecordIndex - 1, currentRecordIndex), content.slice(currentRecordIndex + 1));

    return results;
  };

  var moveUpRecord = function moveUpRecord(content, _id) {
    var record = content.find(function (o) {
      return o._id === _id;
    });

    var currentRecordIndex = content.indexOf(record);
    if (currentRecordIndex < 1) return content;

    return content.slice(0, currentRecordIndex).concat(content.slice(currentRecordIndex + 1, currentRecordIndex + 2), [record], content.slice(currentRecordIndex + 2));
  };

  var actions = _extends({}, collectionStore.actions, (_extends2 = {}, _defineProperty(_extends2, _constants.MOVE_UP, function (state, _ref) {
    var _id = _ref._id;
    return state.update('content', function (content) {
      return moveUpRecord(content, _id);
    });
  }), _defineProperty(_extends2, _constants.MOVE_DOWN, function (state, _ref2) {
    var _id = _ref2._id;
    return state.update('content', function (content) {
      return moveDownRecord(content, _id);
    });
  }), _extends2));

  return { initialState: collectionStore.initialState, actions: actions };
};