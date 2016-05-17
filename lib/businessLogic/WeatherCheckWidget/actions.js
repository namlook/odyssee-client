'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherChange = undefined;

var _constants = require('./constants');

var weatherChange = exports.weatherChange = function weatherChange(status) {
  return { type: _constants.WHEATHER_CHANGE, status: status };
};