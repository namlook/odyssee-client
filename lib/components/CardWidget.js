'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _HeaderUI = require('./ui/HeaderUI');

var _HeaderUI2 = _interopRequireDefault(_HeaderUI);

var _propTypes = require('../utils/prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CardWidget = function CardWidget(props) {
  var title = props.title;
  var icon = props.icon;
  var subtitle = props.subtitle;
  var color = props.color;

  var other = _objectWithoutProperties(props, ['title', 'icon', 'subtitle', 'color']);

  var borderStyle = title ? { border: 0 } : {};
  var header = !title ? null : _react2.default.createElement(_HeaderUI2.default, {
    title: title,
    icon: icon,
    subtitle: subtitle,
    color: color,
    className: 'block top attached' });

  var wrapBody = function wrapBody(body) {
    return !title ? body : _react2.default.createElement(
      'div',
      { style: { padding: 0 }, className: 'ui attached basic segment' },
      body
    );
  };

  var body = _react2.default.createElement(
    'div',
    { style: borderStyle, className: 'ui segments' },
    props.children
  );

  return _react2.default.createElement(
    _Widget2.default,
    other,
    header,
    wrapBody(body)
  );
};

CardWidget.propTypes = _extends({}, _propTypes.routePropTypes, {

  layout: _react.PropTypes.object,
  _name: _react.PropTypes.string,
  className: _react.PropTypes.string,
  title: _react.PropTypes.string,
  subtitle: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  color: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.node
});

exports.default = CardWidget;