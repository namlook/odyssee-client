'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectComponent = exports.pageComponentFactory = exports.extractReducers = exports.extractActions = exports.buildRoutes = undefined;

var _pageComponentFactory = require('./page-component-factory');

var _pageComponentFactory2 = _interopRequireDefault(_pageComponentFactory);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _connectComponent = require('./connect-component');

var _connectComponent2 = _interopRequireDefault(_connectComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.buildRoutes = _route2.default;
exports.extractActions = _action2.default;
exports.extractReducers = _reducer2.default;
exports.pageComponentFactory = _pageComponentFactory2.default;
exports.connectComponent = _connectComponent2.default;