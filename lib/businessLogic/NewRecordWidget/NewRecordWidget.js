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

var NewRecordWidget = function NewRecordWidget(props) {
  var storeState = props.storeState;
  var storeActions = props.storeActions;
  var name = props.name;
  var on = props.on;
  var link = props.link;

  var ownState = storeState[name];
  var ownActions = storeActions[name];
  var records = storeState[link.collection.from].get(link.collection.to);

  var onSave = storeActions[on.save.on][on.save.dispatch];

  var triggerSave = function triggerSave() {
    onSave({ name: ownState.value, position: records.count() });
    ownActions.clearForm();
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
        'div',
        { className: 'fields' },
        _react2.default.createElement(
          'div',
          { className: 'input field' },
          _react2.default.createElement('input', {
            type: 'text',
            value: ownState.value,
            onChange: function onChange(e) {
              return ownActions.changeValue(e.target.value);
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'field' },
          _react2.default.createElement(
            'button',
            { className: 'ui primary button', onClick: triggerSave },
            'save'
          ),
          _react2.default.createElement(
            'button',
            { className: 'ui basic red button', onClick: function onClick() {
                return ownActions.clearForm();
              } },
            'clear'
          )
        )
      )
    )
  );
};

NewRecordWidget.propTypes = {
  name: _react.PropTypes.string.isRequired,
  on: _react.PropTypes.object.isRequired,
  link: _react.PropTypes.object.isRequired,
  storeState: _react.PropTypes.object.isRequired,
  storeActions: _react.PropTypes.object.isRequired
};

exports.default = NewRecordWidget;