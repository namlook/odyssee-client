'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('../utils/prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var WidgetGrid = function WidgetGrid(_ref) {
  var className = _ref.className;
  var children = _ref.children;

  var other = _objectWithoutProperties(_ref, ['className', 'children']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'ui ' + (className || '') + ' grid' }, other),
    children
  );
};

WidgetGrid.propTypes = _extends({}, _propTypes.routePropTypes, {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node
});

exports.default = WidgetGrid;