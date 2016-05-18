'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAll = exports.deleteRecord = exports.updateRecord = exports.addRecord = undefined;

var _constants = require('./constants');

var addRecord = exports.addRecord = function addRecord(record) {
  return { type: _constants.ADD_RECORD, record: record };
};
var updateRecord = exports.updateRecord = function updateRecord(_id, attributes) {
  return { type: _constants.UPDATE_RECORD, _id: _id, attributes: attributes };
};
var deleteRecord = exports.deleteRecord = function deleteRecord(_id) {
  return { type: _constants.DELETE_RECORD, _id: _id };
};
var deleteAll = exports.deleteAll = function deleteAll() {
  return { type: _constants.DELETE_ALL };
};