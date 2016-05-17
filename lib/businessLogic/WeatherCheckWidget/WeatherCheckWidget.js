'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardWidget = require('../../core/components/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeatherCheckWidget = function WeatherCheckWidget(props) {
  var ownStore = props.ownStore;
  var ownActions = props.ownActions;


  return _react2.default.createElement(
    _CardWidget2.default,
    _extends({
      _name: 'weather-check'
    }, props),
    _react2.default.createElement(
      'div',
      { className: 'ui segment' },
      _react2.default.createElement(
        'h3',
        null,
        ownStore.get('currentWeather')
      ),
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return ownActions.weatherChange('sunny');
          } },
        'sunny'
      ),
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return ownActions.weatherChange('rainy');
          } },
        'rainy'
      )
    )
  );
};

WeatherCheckWidget.propTypes = {
  ownStore: _react.PropTypes.object.isRequired,
  ownActions: _react.PropTypes.object.isRequired
};

exports.default = WeatherCheckWidget;