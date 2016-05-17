'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconUI = require('./IconUI');

var _IconUI2 = _interopRequireDefault(_IconUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderUI = function HeaderUI(props) {
  var className = props.className || '';
  var color = props.color || '';

  var subTitle = props.subtitle && _react2.default.createElement(
    'div',
    { className: 'sub header' },
    props.subtitle
  );

  return _react2.default.createElement(
    'div',
    { className: 'ui ' + className + ' header ' + color },
    _react2.default.createElement(_IconUI2.default, { name: props.icon }),
    _react2.default.createElement(
      'div',
      { className: 'content' },
      props.title,
      subTitle
    )
  );
};

HeaderUI.propTypes = {
  className: _react.PropTypes.string,
  color: _react.PropTypes.string,
  title: _react.PropTypes.string,
  subtitle: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  layout: _react.PropTypes.object
};

exports.default = HeaderUI;