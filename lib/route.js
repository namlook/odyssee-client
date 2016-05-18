'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractRoutes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable no-unused-vars */

var _flat = require('flat');

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pageComponentFactory = require('./page-component-factory');

var _pageComponentFactory2 = _interopRequireDefault(_pageComponentFactory);

var _core = require('./utils/core');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const _buildRoutesOld = (routeInfos, pageComponents) => {
//   const orderedRoutes = _.reverse(_.sortBy(Object.keys(routeInfos), 'path'));
//
//   return orderedRoutes.map((routeName) => {
//     const routeConfig = routeInfos[routeName];
//
//     if (routeConfig.outlet) {
//       const outletConfig = routeConfig.outlet;
//       const pageOutletComponent = pageComponents[outletConfig.id];
//       return (
//         <Route
//           key={outletConfig.id}
//           name={outletConfig.id}
//           path={outletConfig.path}
//           component={pageOutletComponent}
//         >
//           {_buildRoutesOld(routeConfig, pageComponents)}
//         </Route>
//       );
//     } else if (routeName === 'index' && routeConfig.redirect) {
//       return <IndexRedirect key={routeConfig.id} to={routeConfig.redirect} />;
//     } else if (routeConfig.id) {
//       const pageComponent = pageComponents[routeConfig.id];
//
//       if (routeName === 'index') {
//         return (
//           <IndexRoute
//             key={routeConfig.id}
//             name={routeConfig.id}
//             component={pageComponent} />
//         );
//       }
//
//       return (
//         <Route
//           key={routeConfig.id}
//           name={routeConfig.id}
//           path={routeConfig.path}
//           component={pageComponent} />
//       );
//     }
//
//     return _buildRoutesOld(routeConfig, pageComponents);
//   });
// };

var _buildRoutes = function _buildRoutes(routeInfos, pageComponents) {
  if (_lodash2.default.isArray(routeInfos)) {
    var sortedRoutes = _lodash2.default.reverse(_lodash2.default.sortBy(routeInfos, function (o) {
      if (o.fullPath) {
        if (o.fullPath === '/*') {
          return -1;
        }
        return o.fullPath;
      }
      return o.outlet[0].fullPath;
    }));
    return sortedRoutes.map(function (routeInfo) {
      return _buildRoutes(routeInfo, pageComponents);
    });
  } else if (routeInfos.outlet) {
    var outletConfig = routeInfos.outlet[0];
    var pageOutletComponent = pageComponents[outletConfig.id];
    return _react2.default.createElement(
      _reactRouter.Route,
      {
        key: outletConfig.id,
        name: outletConfig.id,
        path: outletConfig.path,
        component: pageOutletComponent
      },
      _buildRoutes(routeInfos.pages, pageComponents)
    );
  }
  var pageComponent = pageComponents[routeInfos.id];

  if (routeInfos.name === 'index' && routeInfos.redirect) {
    return _react2.default.createElement(_reactRouter.IndexRedirect, { key: routeInfos.id, to: routeInfos.redirect });
  } else if (routeInfos.name === 'index') {
    return _react2.default.createElement(_reactRouter.IndexRoute, {
      key: routeInfos.id,
      name: routeInfos.id,
      component: pageComponent });
  }

  return _react2.default.createElement(_reactRouter.Route, {
    key: routeInfos.id,
    name: routeInfos.id,
    path: routeInfos.path,
    component: pageComponent });
};

var buildPageComponents = function buildPageComponents(structure, register, actions) {
  var pageComponent = (0, _pageComponentFactory2.default)(structure, register, actions);
  return (0, _core.extractPages)(structure).reduce(function (acc, page) {
    return _extends({}, acc, _defineProperty({}, page.id, pageComponent(page.id)));
  }, {});
};

var _extractRoutes = function _extractRoutes(structure) {
  var root = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var id = arguments.length <= 2 || arguments[2] === undefined ? 'application' : arguments[2];
  return (0, _lodash2.default)(structure).keys(structure).flatMap(function (pageName) {
    if (pageName[0] === '_') return []; // skip pages which begins with '_'

    var pageId = id + '.' + pageName;
    var pagePath = structure[pageName].path || pageName !== 'outlet' && structure[pageName].widgets && pageName || '';
    if (pageName === 'index') {
      var redirect = structure[pageName].redirect;

      return { fullPath: root || '/', path: '', id: pageId, name: pageName, redirect: redirect };
    } else if (pageName === 'outlet') {
      var outletId = id + '.outlet';
      return { fullPath: '', path: pagePath, id: outletId, name: pageName };
    } else if (pagePath) {
      return { fullPath: root + '/' + pagePath, path: pagePath, id: pageId, name: pageName };
    } else if (pageName !== 'outlet' && pageName !== 'index') {
      var outlet = structure[pageName].outlet;

      var newRoot = outlet && outlet.path ? root + '/' + outlet.path : root;
      return _extractRoutes(structure[pageName], newRoot, pageId);
    }
    return null;
  }).compact().orderBy(['id', 'fullPath'], ['asc', 'desc']).groupBy(function (o) {
    return o.id && o.id.split('.').slice(-1)[0] === 'outlet' ? 'outlet' : 'pages';
  }).value();
};

var extractRoutes = exports.extractRoutes = function extractRoutes(structure) {
  return _extractRoutes(structure.pages);
};

exports.default = function (structure, register, actions) {
  var pageComponents = buildPageComponents(structure, register, actions);
  var routes = extractRoutes(structure);
  return _buildRoutes(routes, pageComponents);
};