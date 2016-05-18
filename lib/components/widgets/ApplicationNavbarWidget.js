'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _ConfirmButtonUI = require('../ui/ConfirmButtonUI');

var _ConfirmButtonUI2 = _interopRequireDefault(_ConfirmButtonUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationNavbarWidget = function (_React$Component) {
  _inherits(ApplicationNavbarWidget, _React$Component);

  function ApplicationNavbarWidget(props) {
    _classCallCheck(this, ApplicationNavbarWidget);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationNavbarWidget).call(this, props));

    _this.triggerAction = _this.triggerAction.bind(_this);
    return _this;
  }

  _createClass(ApplicationNavbarWidget, [{
    key: 'triggerAction',
    value: function triggerAction(name, store) {
      var storeName = store + 'Actions';
      this.props[storeName][name]();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var _props$items = _props.items;
      var items = _props$items === undefined ? [] : _props$items;
      var _props$secondaryItems = _props.secondaryItems;
      var secondaryItems = _props$secondaryItems === undefined ? [] : _props$secondaryItems;
      var title = _props.title;

      var other = _objectWithoutProperties(_props, ['items', 'secondaryItems', 'title']);

      var itemLinks = items.map(function (item, i) {
        return _react2.default.createElement(
          _reactRouter.Link,
          { key: i, to: item.route, className: 'item' },
          item.icon ? _react2.default.createElement('i', { className: 'ui ' + item.icon + ' icon' }) : null,
          item.label
        );
      });

      var secondaryItemsLinks = secondaryItems.length ? _react2.default.createElement(
        'div',
        { className: 'right menu' },
        secondaryItems.map(function (item, i) {
          if (item.route) {
            return _react2.default.createElement(
              _reactRouter.Link,
              { key: i, to: item.route, className: 'item' },
              item.icon ? _react2.default.createElement('i', { className: 'ui ' + item.icon + ' icon' }) : null,
              item.label
            );
          } else if (item.confirm) {
            return _react2.default.createElement(
              _ConfirmButtonUI2.default,
              {
                className: 'item',
                color: item.color,
                displayLabel: item.confirm.displayLabel,
                confirmLabel: item.confirm.confirmLabel,
                displayIcon: item.confirm.displayIcon,
                confirmIcon: item.confirm.confirmIcon,
                key: i,
                onConfirm: function onConfirm() {
                  return _this2.triggerAction(item.action, item.store);
                }
              },
              item.icon ? _react2.default.createElement('i', { className: 'ui ' + item.icon + ' icon' }) : null,
              item.label
            );
          }
          return _react2.default.createElement(
            'a',
            { key: i, className: 'item', onClick: function onClick() {
                return _this2.triggerAction(item.action, item.store);
              } },
            item.icon ? _react2.default.createElement('i', { className: 'ui ' + item.icon + ' icon' }) : null,
            item.label
          );
        })
      ) : null;

      return _react2.default.createElement(
        _Widget2.default,
        _extends({ _name: 'application-navbar', style: { paddingBottom: 0 } }, other),
        _react2.default.createElement(
          'div',
          {
            style: { borderRadius: 0 },
            className: 'ui large inverted ' + (this.props.color || '') + ' top  menu'
          },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'header item' },
            ' ',
            title,
            ' '
          ),
          itemLinks,
          secondaryItemsLinks
        )
      );
    }
  }]);

  return ApplicationNavbarWidget;
}(_react2.default.Component);

ApplicationNavbarWidget.propTypes = {
  title: _react.PropTypes.string.isRequired,
  color: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    route: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
  })),
  secondaryItems: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    route: _react.PropTypes.string,
    action: _react.PropTypes.string,
    store: _react.PropTypes.string,
    icon: _react.PropTypes.string
  }))
};

exports.default = ApplicationNavbarWidget;