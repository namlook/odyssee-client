'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.constants = exports.actions = exports.Component = undefined;

var _ScoreFormWidget = require('./ScoreFormWidget');

var _ScoreFormWidget2 = _interopRequireDefault(_ScoreFormWidget);

var _actions2 = require('../../stores/RecordStore/actions');

var _actions = _interopRequireWildcard(_actions2);

var _constants2 = require('../../stores/RecordStore/constants');

var _constants = _interopRequireWildcard(_constants2);

var _reducer2 = require('./reducer');

var _reducer3 = _interopRequireDefault(_reducer2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Component = _ScoreFormWidget2.default;
exports.actions = _actions;
exports.constants = _constants;
exports.reducer = _reducer3.default;