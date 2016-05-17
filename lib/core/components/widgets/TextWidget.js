'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardWidget = require('../CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/no-danger */

var TextWidget = function TextWidget(props) {
  var content = props.content;

  var other = _objectWithoutProperties(props, ['content']);

  return _react2.default.createElement(
    _CardWidget2.default,
    _extends({ _name: 'text' }, other),
    _react2.default.createElement(
      'div',
      { className: 'ui segment' },
      _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: content } })
    )
  );
};

TextWidget.propTypes = {
  className: _react.PropTypes.string,
  content: _react.PropTypes.string
};

exports.default = TextWidget;