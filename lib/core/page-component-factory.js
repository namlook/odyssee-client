'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectComponent = require('./connect-component');

var _connectComponent2 = _interopRequireDefault(_connectComponent);

var _WidgetGrid = require('./components/WidgetGrid');

var _WidgetGrid2 = _interopRequireDefault(_WidgetGrid);

var _core = require('./utils/core');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getPageConfig = exports.getPageConfig = function getPageConfig(struct, id) {
  var pages = (0, _core.extractPages)(struct);
  return _lodash2.default.find(pages, { id: id });
};

var getAllStoreNames = function getAllStoreNames(structure) {
  var results = [].concat((0, _core.extractStores)(structure).map(function (o) {
    return o.name;
  }), (0, _core.extractWidgets)(structure).map(function (_ref) {
    var store = _ref.store;
    return store && store.name;
  }));
  return _lodash2.default.compact(results);
};

exports.default = function (structure, register, actions) {
  return function (path) {
    var generateWidgetComponent = function generateWidgetComponent(widgetConfig, pageProps, keyIndex) {
      var type = widgetConfig.type;
      var store = widgetConfig.store;

      var widgetProps = _objectWithoutProperties(widgetConfig, ['type', 'store']);

      var widgetName = (0, _core.pascalCase)(type) + 'Widget';
      var widget = register.widgets[widgetName];

      if (!widget) {
        throw new Error('unregistered widget ' + widgetName);
      }
      var Component = widget.Component;


      var componentProps = Object.keys(widgetProps).reduce(function (acc, propName) {
        return _extends({}, acc, _defineProperty({}, propName, widgetProps[propName]));
      }, {});

      var componentPropTypeNames = Object.keys(Component.propTypes || {});
      var requiredProps = componentPropTypeNames.reduce(function (acc, propName) {
        if (pageProps[propName] != null) {
          return _extends({}, acc, _defineProperty({}, propName, pageProps[propName]));
        }
        return acc;
      }, {});

      var _linkedStores = widgetProps.linkedStores || {};
      var ownStoreName = store && store.name;
      var linkedStores = ownStoreName ? _extends({}, _linkedStores, { own: ownStoreName }) : _linkedStores;

      var shouldBeConnected = Object.keys(linkedStores).length;
      if (shouldBeConnected) {
        (function () {
          var storeNamesFound = getAllStoreNames(structure);
          Object.keys(linkedStores).forEach(function (storeName) {
            if (storeNamesFound.indexOf(linkedStores[storeName]) === -1) {
              console.warn( // eslint-disable-line no-console
              'ERROR! the store `' + linkedStores[storeName] + '` is linked to the ' + ('component `' + widgetName + '` as `' + storeName + '` but is not found in structure'));
            }
          });

          Component = (0, _connectComponent2.default)(actions, linkedStores)(Component);
        })();
      }

      var props = _extends({}, requiredProps, componentProps, { key: '' + type + keyIndex });
      return _react2.default.createElement(Component, props, pageProps.children);
    };

    var _getPageConfig = getPageConfig(structure, path);

    var config = _getPageConfig.config;
    var name = _getPageConfig.name;
    var id = _getPageConfig.id;

    var PageComponent = function PageComponent(props) {
      return !(config.widgets && config.widgets.length) ? null : _react2.default.createElement(
        _WidgetGrid2.default,
        _extends({}, props, { className: id.split('.').join('-') + '-page' }),
        config.widgets.map(function (widget, keyIdx) {
          return generateWidgetComponent(widget, props, keyIdx);
        })
      );
    };

    PageComponent.displayName = (0, _core.pascalCase)(name) + 'Page';
    return PageComponent;
  };
};

//
// import React, { PropTypes } from 'react';
//
// import { connectPage } from '../../core';
// import actions from '../../actions';
//
// import WidgetGrid from '../../core/components/WidgetGrid.jsx';
// import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';
// import HeaderWidget from '../../core/components/widgets/HeaderWidget.jsx';
//
// import { Component as NewRecordWidget } from '../../businessLogic/NewRecordWidget';
// import { Component as ParticipantsEditWidget } from '../../businessLogic/ParticipantsEditWidget';
//
// const NewRecordWidgetConnected = connectPage(actions)(NewRecordWidget);
// const ParticipantsEditWidgetConnected = connectPage(actions)(ParticipantsEditWidget);
//
// export const ParticipantsPage = (props) => (
//   <WidgetGrid>
//     <MenuWidget title="Participants" />
//
//     <NewRecordWidgetConnected
//       title="add participant"
//       name="add-participant"
//       on={{
//         save: { dispatch: 'addRecord', on: 'participants-store' },
//       }}
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }}
//       {...props} />
//
//     <HeaderWidget title="bouh!" icon="smile" subtitle="ahahaha" color="teal" />
//
//     <ParticipantsEditWidgetConnected
//       title="All the participants"
//       icon="users"
//       name="participants-edit-list"
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }} // use to diplay the records
//       on={{
//         rename: { dispatch: 'updateRecord', on: 'participants-store' },
//         delete: { dispatch: 'deleteRecord', on: 'participants-store' },
//         moveUp: { dispatch: 'moveUp', on: 'participants-store' },
//         moveDown: { dispatch: 'moveDown', on: 'participants-store' },
//       }}
//       {...props} />
//
//   </WidgetGrid>
// );
//
//
// export default ParticipantsPage;