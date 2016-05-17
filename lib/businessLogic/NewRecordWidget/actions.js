'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearForm = exports.changeValue = undefined;

var _constants = require('./constants');

var changeValue = exports.changeValue = function changeValue(value) {
  return { type: _constants.CHANGE, value: value };
};

var clearForm = exports.clearForm = function clearForm() {
  return { type: _constants.CLEAR };
};