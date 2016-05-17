'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardWidget = require('../../components/widgets/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AreWeOpenWidget = function AreWeOpenWidget(props) {
  var weatherStore = props.weatherStore;

  var currentWeather = weatherStore.get('currentWeather');

  var status = currentWeather === 'rainy' ? "no we are not :(" : "yes we are ! :)";

  return _react2.default.createElement(
    _CardWidget2.default,
    _extends({
      _name: 'are-we-open'
    }, props),
    _react2.default.createElement(
      'div',
      { className: 'ui segment' },
      _react2.default.createElement(
        'h3',
        null,
        status
      )
    )
  );
};

AreWeOpenWidget.propTypes = {
  weatherStore: _react.PropTypes.object.isRequired
};

exports.default = AreWeOpenWidget;