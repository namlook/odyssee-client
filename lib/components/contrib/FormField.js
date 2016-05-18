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
  var onlyInput = props.onlyInput;
  var className = props.className;
  var pattern = props.pattern;
  var type = props.type;

  var fieldClassName = (className || '') + ' field';
  var input = _react2.default.createElement('input', {
    name: name,
    type: type || 'text',
    pattern: pattern,
    value: value,
    placeholder: placeholder,
    onChange: function onChange(e) {
      return _onChange(props.name, e.target.value);
    } });

  if (onlyInput) {
    return input;
  }

  return _react2.default.createElement(
    'div',
    { className: fieldClassName },
    label ? _react2.default.createElement(
      'label',
      null,
      label
    ) : null,
    input
  );
};

FormField.propTypes = {
  label: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  onlyInput: _react.PropTypes.bool, // if true, don't wrap the input into a field
  pattern: _react.PropTypes.string,
  className: _react.PropTypes.string,
  type: _react.PropTypes.string,
  value: _react.PropTypes.node.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  inputStyle: _react.PropTypes.object
};

exports.default = FormField;