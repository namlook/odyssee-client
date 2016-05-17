'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _propTypes = require('../utils/prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Outlet = function Outlet(_ref) {
  var children = _ref.children;

  var other = _objectWithoutProperties(_ref, ['children']);

  return _react2.default.createElement(
    _Widget2.default,
    _extends({ _name: 'outlet' }, other),
    children
  );
};

Outlet.propTypes = _extends({}, _propTypes.routePropTypes, {
  children: _react.PropTypes.node
});

exports.default = Outlet;