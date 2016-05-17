'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.update = exports.updateProperty = undefined;

var _constants = require('./constants');

var updateProperty = exports.updateProperty = function updateProperty(property, value) {
  return { type: _constants.UPDATE_PROPERTY, property: property, value: value };
};
var update = exports.update = function update(record) {
  return { type: _constants.UPDATE, record: record };
};

var clear = exports.clear = function clear() {
  return { type: _constants.CLEAR };
};