'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ownPropTypes = exports.routePropTypes = undefined;

var _react = require('react');

/* eslint-disable react/forbid-prop-types */

var routePropTypes = exports.routePropTypes = {
  location: _react.PropTypes.object,
  params: _react.PropTypes.object,
  routeParams: _react.PropTypes.object,
  routes: _react.PropTypes.array,
  route: _react.PropTypes.object
};

var ownPropTypes = exports.ownPropTypes = function ownPropTypes(mainLinkedStoreName) {
  var customPropType = function customPropType(ownThing) {
    return function (props, propName, componentName) {
      var error = void 0;
      if (!props[ownThing] && !props[mainLinkedStoreName]) {
        error = new Error('Missing prop: linked store `' + mainLinkedStoreName + '` or prop `store.name` should\n        be supplied to ' + componentName + '. Validation failed.');
      }
      return error;
    };
  };
  return {
    ownStore: customPropType('ownStore'),
    ownActions: customPropType('ownActions')
  };
};