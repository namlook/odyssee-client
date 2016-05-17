'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('./utils/core');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _addStoreNameToAction = function _addStoreNameToAction(_storeName, action) {
  return function () {
    return _extends({}, action.apply(undefined, arguments), {
      _storeName: _storeName
    });
  };
};

var createActions = function createActions(actions) {
  return function (storeName) {
    return Object.keys(actions).map(function (actionName) {
      return {
        name: actionName,
        fn: _addStoreNameToAction(storeName, actions[actionName])
      };
    }).reduce(function (acc, action) {
      return _extends({}, acc, _defineProperty({}, action.name, action.fn));
    }, {});
  };
};

var extractWidgetActions = function extractWidgetActions(structure, register) {
  return (0, _core.extractWidgets)(structure).map(function (_ref) {
    var store = _ref.store;

    var widget = _objectWithoutProperties(_ref, ['store']);

    var widgetName = (0, _core.pascalCase)(widget.type) + 'Widget';
    var widgetConfig = register.widgets[widgetName];
    if (!widgetConfig) {
      throw new Error('unregistered widget ' + widgetName);
    }
    var actions = register.widgets[widgetName].actions;
    var ownStoreName = store && store.name;
    return actions ? { name: ownStoreName, actionCreator: createActions(actions) } : null;
  }).reduce(function (acc, item) {
    return item && item.name ? _extends({}, acc, _defineProperty({}, item.name, item.actionCreator)) : acc;
  }, {});
};

var extractStoreActions = function extractStoreActions(structure, register) {
  return (0, _core.extractStores)(structure).map(function (store) {
    var storeName = (0, _core.pascalCase)(store.type) + 'Store';
    var storeConfig = register.stores[storeName];
    if (!storeConfig) {
      throw new Error('unregistered store ' + storeName);
    }
    var actions = register.stores[storeName].actions;
    return actions ? { name: store.name, actionCreator: createActions(actions) } : null;
  }).reduce(function (acc, item) {
    return item ? _extends({}, acc, _defineProperty({}, item.name, item.actionCreator)) : acc;
  }, {});
};

exports.default = function (structure, register) {
  return _extends({}, extractWidgetActions(structure, register), extractStoreActions(structure, register));
};