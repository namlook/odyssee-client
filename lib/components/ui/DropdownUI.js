'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _semanticUiTransition = require('semantic-ui-transition');

var _semanticUiTransition2 = _interopRequireDefault(_semanticUiTransition);

var _semanticUiDropdown = require('semantic-ui-dropdown');

var _semanticUiDropdown2 = _interopRequireDefault(_semanticUiDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.$ = _jquery2.default;
window.$.fn.transition = _semanticUiTransition2.default;
window.$.fn.dropdown = _semanticUiDropdown2.default;

/* eslint-disable react/no-set-state */

var DropdownUI = exports.DropdownUI = function (_React$Component) {
  _inherits(DropdownUI, _React$Component);

  function DropdownUI() {
    _classCallCheck(this, DropdownUI);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownUI).apply(this, arguments));
  }

  _createClass(DropdownUI, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onChange = this.props.onChange;

      $(this.refs.dropdown).dropdown({
        onChange: onChange
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var className = _props.className;
      var children = _props.children;

      return _react2.default.createElement(
        'div',
        { style: style, className: 'ui dropdown ' + (className || ''), ref: 'dropdown' },
        children
      );
    }
  }]);

  return DropdownUI;
}(_react2.default.Component);

DropdownUI.propTypes = {
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  children: _react.PropTypes.node
};

exports.default = DropdownUI;