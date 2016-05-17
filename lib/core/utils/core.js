'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractStores = exports.extractWidgetClassNames = exports.extractWidgets = exports.extractPages = exports.pascalCase = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pascalCase = exports.pascalCase = function pascalCase(string) {
  return string.split('-').map(function (s) {
    return _lodash2.default.capitalize(s);
  }).join('');
};

var _extractPages = function _extractPages(struct) {
  var id = arguments.length <= 1 || arguments[1] === undefined ? 'application' : arguments[1];
  return (0, _lodash2.default)(struct).keys(struct).flatMap(function (pageName) {
    if (pageName[0] === '_') return []; // skip pages which begins with '_'

    var newId = id + '.' + pageName;
    if (!struct[pageName].widgets && !struct[pageName].redirect) {
      return _extractPages(struct[pageName], newId);
    }
    return { id: newId, name: pageName, config: struct[pageName] };
  }).value();
};

var extractPages = exports.extractPages = function extractPages(struct) {
  return _extractPages(struct.pages);
};

var extractWidgets = exports.extractWidgets = function extractWidgets(struct) {
  return (0, _lodash2.default)(extractPages(struct)).flatMap(function (pageConfig) {
    return pageConfig.config.widgets || [];
  }).value();
};

var extractWidgetClassNames = exports.extractWidgetClassNames = function extractWidgetClassNames(struct) {
  return extractWidgets(struct).map(function (widgetConfig) {
    return pascalCase(widgetConfig.type) + 'Widget';
  });
};

var _extractStores = function _extractStores(struct) {
  return (0, _lodash2.default)(extractPages(struct)).flatMap(function (pageConfig) {
    return pageConfig.config.stores || [];
  }).value();
};

var extractStores = exports.extractStores = function extractStores(struct) {
  return (struct.stores || []).concat(_extractStores(struct));
};

// import structure from '../../config/structure';
// console.log(JSON.stringify(extractPages(structure), null, 2));