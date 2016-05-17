'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _IconUI = require('../ui/IconUI');

var _IconUI2 = _interopRequireDefault(_IconUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderWidget = function HeaderWidget(props) {
  var widgetClassName = props.className || '';

  var subTitle = props.subtitle ? _react2.default.createElement(
    'div',
    { className: 'sub header' },
    props.subtitle
  ) : null;

  return _react2.default.createElement(
    _Widget2.default,
    { _name: 'header', className: widgetClassName, layout: props.layout },
    _react2.default.createElement(
      'div',
      { className: 'ui basic segment', style: { paddingTop: 0, paddingBottom: 0 } },
      _react2.default.createElement(
        'div',
        { className: 'ui dividing header ' + props.color },
        _react2.default.createElement(_IconUI2.default, { name: props.icon }),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          props.title,
          subTitle
        )
      )
    )
  );
};

HeaderWidget.propTypes = {
  className: _react.PropTypes.string,
  color: _react.PropTypes.string,
  title: _react.PropTypes.string,
  subtitle: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  layout: _react.PropTypes.object
};

exports.default = HeaderWidget;