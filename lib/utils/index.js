'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRecordFromStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fillParams = function fillParams(routeParamsMapping, routeParams) {
  return Object.keys(routeParamsMapping || {}).reduce(function (acc, propertyName) {
    var value = routeParamsMapping[propertyName];
    return _extends({}, acc, _defineProperty({}, propertyName, value[0] === ':' ? routeParams[value.slice(1)] : value));
  }, {});
};

var findRecordFromStore = exports.findRecordFromStore = function findRecordFromStore(collectionStore, routeParamsMapping, routeParams) {
  var queryFilter = fillParams(routeParamsMapping, routeParams);
  return !_lodash2.default.isEmpty(queryFilter) && collectionStore.get('content').find(_lodash2.default.matches(queryFilter));
};