'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormField = function FormField(props) {
  var label = props.label;
  var placeholder = props.placeholder;
  var name = props.name;
  var value = props.value;
  var _onChange = props.onChange;
  var className = props.className;
  var type = props.type;

  var fieldClassName = (className || '') + ' field';
  return _react2.default.createElement(
    'div',
    { className: fieldClassName },
    label ? _react2.default.createElement(
      'label',
      null,
      label
    ) : null,
    _react2.default.createElement('input', {
      name: name,
      type: type || 'text',
      value: value,
      placeholder: placeholder,
      onChange: function onChange(e) {
        return _onChange(props.name, e.target.value);
      } })
  );
};

FormField.propTypes = {
  label: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  type: _react.PropTypes.string,
  value: _react.PropTypes.node.isRequired,
  onChange: _react.PropTypes.func.isRequired
};

exports.default = FormField;