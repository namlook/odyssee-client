'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _immutable = require('immutable');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var generateUniqID = function generateUniqID() {
  return Math.random() * Math.pow(10, 20) + '-' + Date.now();
};

exports.default = function (config) {
  var _actions;

  var initialState = (0, _immutable.Map)({
    content: (0, _immutable.List)()
  });

  var CollectionRecord = (0, _immutable.Record)(config.recordSchema);
  var createRecord = function createRecord(_id, attributes) {
    var recordAttributes = _immutable.Iterable.isIterable(attributes) ? attributes.toJS() : attributes;
    return new CollectionRecord(_extends({ _id: _id }, recordAttributes));
  };

  var actions = (_actions = {}, _defineProperty(_actions, _constants.ADD_RECORD, function (state, _ref) {
    var record = _ref.record;
    return state.update('content', function (content) {
      // add
      if (!record._id) {
        var _ret = function () {
          var _id = generateUniqID();
          if (content.find(function (rec) {
            return rec._id === _id;
          })) return {
              v: content
            };
          var recordWithId = record.set('_id', _id);
          return {
            v: content.push(createRecord(_id, recordWithId))
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
      // edit
      var recordToUpdate = content.find(function (entry) {
        return entry.get('_id') === record._id;
      });
      var recordToUpdateIndex = content.indexOf(recordToUpdate);
      return content.update(recordToUpdateIndex, function () {
        return record;
      });
    });
  }), _defineProperty(_actions, _constants.UPDATE_RECORD, function (state, _ref2) {
    var _id = _ref2._id;
    var attributes = _ref2.attributes;
    return state.update('content', function (content) {
      var recordToUpdate = content.find(function (entry) {
        return entry.get('_id') === _id;
      });
      var recordToUpdateIndex = content.indexOf(recordToUpdate);
      return content.update(recordToUpdateIndex, function () {
        return createRecord(_id, attributes);
      });
    });
  }), _defineProperty(_actions, _constants.DELETE_RECORD, function (state, _ref3) {
    var _id = _ref3._id;
    return state.update('content', function (content) {
      return content.filter(function (entry) {
        return entry.get('_id') !== _id;
      });
    });
  }), _actions);

  return { initialState: initialState, actions: actions };
};