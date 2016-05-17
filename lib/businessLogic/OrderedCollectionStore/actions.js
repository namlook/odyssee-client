'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveDown = exports.moveUp = undefined;

var _actions = require('../CollectionStore/actions');

Object.keys(_actions).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _constants = require('./constants');

var moveUp = exports.moveUp = function moveUp(_id) {
  return { type: _constants.MOVE_UP, _id: _id };
};
var moveDown = exports.moveDown = function moveDown(_id) {
  return { type: _constants.MOVE_DOWN, _id: _id };
};