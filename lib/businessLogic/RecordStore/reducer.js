'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _immutable = require('immutable');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var castValue = function castValue(schema, property, value) {
  if (schema[property] === 'number') return parseFloat(value);
  return value == null ? '' : value;
};

exports.default = function (config) {
  var _actions;

  var placeholder = Object.keys(config.schema || {}).reduce(function (acc, name) {
    return _extends({}, acc, _defineProperty({}, name, ''));
  }, {});

  var ScoreRecord = (0, _immutable.Record)(placeholder);
  var initialState = new ScoreRecord();

  var actions = (_actions = {}, _defineProperty(_actions, _constants.CLEAR, function () {
    return initialState;
  }), _defineProperty(_actions, _constants.UPDATE, function (state, _ref) {
    var record = _ref.record;
    return new ScoreRecord(record);
  }), _defineProperty(_actions, _constants.UPDATE_PROPERTY, function (state, _ref2) {
    var property = _ref2.property;
    var value = _ref2.value;

    var castedValue = castValue(config.schema, property, value);
    return state.set(property, castedValue);
  }), _actions);

  return { initialState: initialState, actions: actions };
};