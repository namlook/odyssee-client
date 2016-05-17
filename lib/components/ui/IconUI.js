'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconUI = function IconUI(props) {
  if (!props.name) return null;
  var iconClassName = props.name + ' ' + props.size + ' icon';
  return _react2.default.createElement('i', { className: iconClassName });
};

IconUI.propTypes = {
  name: _react.PropTypes.string,
  size: _react.PropTypes.string
};

exports.default = IconUI;