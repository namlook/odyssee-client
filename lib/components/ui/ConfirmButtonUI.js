'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmButtonUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-set-state */

var ConfirmButtonUI = exports.ConfirmButtonUI = function (_React$Component) {
  _inherits(ConfirmButtonUI, _React$Component);

  function ConfirmButtonUI(props) {
    _classCallCheck(this, ConfirmButtonUI);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmButtonUI).call(this, props));

    _this.state = { confirmState: false, timer: null };
    return _this;
  }

  _createClass(ConfirmButtonUI, [{
    key: 'clicked',
    value: function clicked(event) {
      var _this2 = this;

      event.preventDefault();
      if (this.state.confirmState) {
        clearTimeout(this.state.timer);
        this.setState({ confirmState: false, timer: null });
        this.props.onConfirm();
      } else {
        var timer = setTimeout(function () {
          _this2.setState({ timer: null, confirmState: false });
        }, 1500);
        this.setState({ confirmState: true, timer: timer });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var _props$color = _props.color;
      var color = _props$color === undefined ? '' : _props$color;
      var _props$confirmLabel = _props.confirmLabel;
      var confirmLabel = _props$confirmLabel === undefined ? '' : _props$confirmLabel;
      var _props$displayLabel = _props.displayLabel;
      var displayLabel = _props$displayLabel === undefined ? '' : _props$displayLabel;
      var _props$confirmIcon = _props.confirmIcon;
      var confirmIcon = _props$confirmIcon === undefined ? '' : _props$confirmIcon;
      var _props$displayIcon = _props.displayIcon;
      var displayIcon = _props$displayIcon === undefined ? '' : _props$displayIcon;
      var _props$className = _props.className;
      var className = _props$className === undefined ? '' : _props$className;
      var _props$displayClassNa = _props.displayClassName;
      var displayClassName = _props$displayClassNa === undefined ? '' : _props$displayClassNa;
      var _props$confirmClassNa = _props.confirmClassName;
      var confirmClassName = _props$confirmClassNa === undefined ? '' : _props$confirmClassNa;


      var buttonClassName = this.state.confirmState ? className + ' ' + confirmClassName : className + ' ' + displayClassName;

      var label = this.state.confirmState ? confirmLabel : displayLabel;
      var icon = this.state.confirmState ? confirmIcon : displayIcon;
      return _react2.default.createElement(
        'a',
        { className: buttonClassName, onClick: function onClick(e) {
            return _this3.clicked(e);
          } },
        icon ? _react2.default.createElement('i', { className: 'ui ' + icon + ' ' + color + ' icon' }) : null,
        label
      );
    }
  }]);

  return ConfirmButtonUI;
}(_react2.default.Component);

ConfirmButtonUI.propTypes = {
  className: _react.PropTypes.string,
  color: _react.PropTypes.string,
  confirmClassName: _react.PropTypes.string,
  displayClassName: _react.PropTypes.string,
  displayLabel: _react.PropTypes.string,
  confirmLabel: _react.PropTypes.string,
  displayIcon: _react.PropTypes.string,
  confirmIcon: _react.PropTypes.string,
  onConfirm: _react.PropTypes.func.isRequired
};

exports.default = ConfirmButtonUI;