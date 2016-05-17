'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  value: ''
};

var actions = (_actions = {}, _defineProperty(_actions, _constants.CLEAR, function (state) {
  return _extends({}, state, { value: '' });
}), _defineProperty(_actions, _constants.CHANGE, function (state, _ref) {
  var value = _ref.value;
  return _extends({}, state, { value: value });
}), _actions);

exports.default = { initialState: initialState, actions: actions };