'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _immutable = require('immutable');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  currentWeather: 'sunny'
});

var actions = _defineProperty({}, _constants.WHEATHER_CHANGE, function (state, _ref) {
  var status = _ref.status;
  return state.set('currentWeather', status);
});

exports.default = { initialState: initialState, actions: actions };