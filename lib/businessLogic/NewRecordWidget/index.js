'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.reducer = exports.constants = exports.actions = undefined;

var _actions2 = require('./actions');

var _actions = _interopRequireWildcard(_actions2);

var _constants2 = require('./constants');

var _constants = _interopRequireWildcard(_constants2);

var _reducer2 = require('./reducer');

var _reducer3 = _interopRequireDefault(_reducer2);

var _NewRecordWidget = require('./NewRecordWidget');

var _NewRecordWidget2 = _interopRequireDefault(_NewRecordWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.actions = _actions;
// import Component from './NewRecordWidget.jsx';
// import * as actions from './actions';
// import * as constants from './constants';
// import reducer from './reducer';

exports.constants = _constants;
exports.reducer = _reducer3.default;
exports.Component = _NewRecordWidget2.default;

// export default {
//   actions,
//   constants,
//   reducer,
//   Component,
// };