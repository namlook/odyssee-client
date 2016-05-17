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

var FormSubmitWidget = function FormSubmitWidget(props) {
  var storeState = props.storeState;
  var storeActions = props.storeActions;
  var on = props.on;
  var link = props.link;

  var record = storeState[link.record];

  var onSave = storeActions[on.save.on][on.save.dispatch];
  var onClear = storeActions[on.clear.on][on.clear.dispatch];

  var triggerSave = function triggerSave() {
    onSave(record);
    onClear();
  };

  return _react2.default.createElement(
    _CardWidget2.default,
    _extends({
      _name: 'new-record'
    }, props),
    _react2.default.createElement(
      'div',
      { className: 'ui form segment' },
      _react2.default.createElement(
        'button',
        { className: 'ui primary button', onClick: triggerSave },
        'save'
      ),
      _react2.default.createElement(
        'button',
        { className: 'ui basic red button', onClick: function onClick() {
            return onClear();
          } },
        'clear'
      )
    )
  );
};

FormSubmitWidget.propTypes = {
  on: _react.PropTypes.object.isRequired,
  link: _react.PropTypes.object.isRequired,
  storeState: _react.PropTypes.object.isRequired,
  storeActions: _react.PropTypes.object.isRequired
};

exports.default = FormSubmitWidget;