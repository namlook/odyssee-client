'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _DropdownUI = require('../ui/DropdownUI');

var _DropdownUI2 = _interopRequireDefault(_DropdownUI);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicationMenuWidget = function ApplicationMenuWidget(props) {
  var currentLocationPath = props.location.pathname;

  var color = props.color || '';
  var widgetClassName = (props.className || '') + ' ' + color;
  var menuClassName = 'large fluid inverted ' + color;
  // const mobileMenuClassName = `ui stackable ${menuClassName} menu`;
  var computerMenuClassName = 'ui vertical ' + menuClassName + ' menu';

  var generateMenuLink = function generateMenuLink(item) {
    return _react2.default.createElement(
      _reactRouter.Link,
      {
        to: item.route,
        key: item.label,
        onlyActiveOnIndex: !item.index,
        activeClassName: 'active',
        className: 'item'
      },
      _react2.default.createElement('i', { className: item.icon + ' icon' }),
      item.label
    );
  };

  var generateComputerMenuLink = function generateComputerMenuLink(item) {
    if (item.items) {
      return _react2.default.createElement(
        'div',
        { key: item.label, className: 'item' },
        _react2.default.createElement('i', { className: item.icon + ' icon' }),
        item.label,
        item.items ? _react2.default.createElement(
          'div',
          { className: 'menu' },
          item.items.map(generateMenuLink)
        ) : null
      );
    }
    return generateMenuLink(item);
  };

  var generateMobileMenuLink = function generateMobileMenuLink(item) {
    if (item.items) {
      return item.items.map(function (subitem) {
        var newSubitem = _extends({}, subitem, { label: item.label + ': ' + subitem.label });
        return generateMobileMenuLink(newSubitem);
      });
    }
    return generateMenuLink(item);
  };

  var computerItems = props.items.map(generateComputerMenuLink);
  var mobileItems = props.items.map(generateMobileMenuLink);

  var currentItem = (0, _lodash2.default)(props.items).flatMap(function (item) {
    if (item.items) {
      return item.items.map(function (subitem) {
        return {
          route: subitem.route,
          icon: subitem.icon,
          label: item.label + ': ' + subitem.label
        };
      });
    }
    return [item];
  }).filter(function (item) {
    return item.route === currentLocationPath;
  }).map(function (item) {
    return _react2.default.createElement(
      'span',
      { key: item.route },
      _react2.default.createElement('i', { className: item.icon + ' icon' }),
      item.label
    );
  }).value();

  return _react2.default.createElement(
    _Widget2.default,
    {
      _name: 'application-menu',
      layout: props.layout,
      className: widgetClassName
    },
    _react2.default.createElement(
      'div',
      { className: 'ui one column grid' },
      _react2.default.createElement(
        'div',
        { style: { paddingTop: 0, paddingBottom: 0 }, className: 'mobile only column' },
        _react2.default.createElement(
          _DropdownUI2.default,
          { className: 'ui teal fluid dropdown button' },
          currentItem,
          _react2.default.createElement('i', { className: 'dropdown icon' }),
          _react2.default.createElement(
            'div',
            { className: 'menu' },
            mobileItems
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'tablet only computer only column' },
        _react2.default.createElement(
          'div',
          { className: computerMenuClassName },
          computerItems
        )
      )
    )
  );
};

ApplicationMenuWidget.propTypes = {
  layout: _react.PropTypes.object,
  className: _react.PropTypes.string,
  location: _react.PropTypes.object.isRequired,
  title: _react.PropTypes.string,
  color: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired,
    route: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
  }))
};

exports.default = ApplicationMenuWidget;