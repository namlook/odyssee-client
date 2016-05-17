'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('./utils/core');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var createReducer = function createReducer(name, config) {
  return function (reducerFn) {
    var reducer = typeof reducerFn === 'function' ? reducerFn(config) : reducerFn;
    var initialState = reducer.initialState;
    var actions = reducer.actions;
    var postProcess = reducer.postProcess;


    return function () {
      var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
      var action = arguments[1];

      if (action._storeName !== name) {
        return state;
      }
      var actionFn = actions[action.type];
      var newState = actionFn ? actionFn(state, action) : state;
      return postProcess ? postProcess(newState) : newState;
    };
  };
};

var extractWidgetReducers = function extractWidgetReducers(structure, register) {
  return (0, _core.extractWidgets)(structure, register).map(function (_ref) {
    var store = _ref.store;

    var widget = _objectWithoutProperties(_ref, ['store']);

    var widgetName = (0, _core.pascalCase)(widget.type) + 'Widget';
    var widgetConfig = register.widgets[widgetName];
    if (!widgetConfig) {
      throw new Error('unregistered widget ' + widgetName);
    }
    var reducer = register.widgets[widgetName].reducer;
    var ownStore = store || {};
    return !reducer ? null : {
      name: ownStore.name,
      reducerCreator: createReducer(ownStore.name, store || {})(reducer)
    };
  }).reduce(function (acc, item) {
    return item && item.name ? _extends({}, acc, _defineProperty({}, item.name, item.reducerCreator)) : acc;
  }, {});
};

var extractStoreReducers = function extractStoreReducers(structure, register) {
  return (0, _core.extractStores)(structure, register).map(function (store) {
    var storeName = (0, _core.pascalCase)(store.type) + 'Store';
    if (!register.stores[storeName]) {
      throw new Error('unregistered store ' + storeName);
    }
    var reducer = register.stores[storeName].reducer;
    return reducer ? { name: store.name, reducerCreator: createReducer(store.name, store)(reducer) } : null;
  }).reduce(function (acc, item) {
    return item ? _extends({}, acc, _defineProperty({}, item.name, item.reducerCreator)) : acc;
  }, {});
};

exports.default = function (structure, register) {
  return _extends({}, extractWidgetReducers(structure, register), extractStoreReducers(structure, register));
};