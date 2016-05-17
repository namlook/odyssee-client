'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicationNavbarWidget = function ApplicationNavbarWidget(props) {
  return _react2.default.createElement(
    _Widget2.default,
    {
      _name: 'application-navbar',
      layout: props.layout,
      style: { paddingBottom: 0 },
      className: props.className
    },
    _react2.default.createElement(
      'div',
      { style: { borderRadius: 0 }, className: 'ui large inverted ' + (props.color || '') + ' top  menu' },
      _react2.default.createElement(
        'a',
        { className: 'header item' },
        ' ',
        _react2.default.createElement('i', { className: 'user icon' }),
        ' ',
        props.title,
        ' '
      ),
      _react2.default.createElement(
        'a',
        { className: 'item' },
        'foo'
      ),
      _react2.default.createElement(
        'div',
        { className: 'right menu' },
        _react2.default.createElement(
          'a',
          { className: 'item' },
          'logout'
        )
      )
    )
  );
};

ApplicationNavbarWidget.propTypes = {
  layout: _react.PropTypes.object,
  className: _react.PropTypes.string,
  title: _react.PropTypes.string.isRequired,
  color: _react.PropTypes.string
};

exports.default = ApplicationNavbarWidget;