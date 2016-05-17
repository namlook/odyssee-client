'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuWidget = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _propTypes = require('../../utils/prop-types');

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _semanticUiTransition = require('semantic-ui-transition');

var _semanticUiTransition2 = _interopRequireDefault(_semanticUiTransition);

var _semanticUiPopup = require('semantic-ui-popup');

var _semanticUiPopup2 = _interopRequireDefault(_semanticUiPopup);

var _semanticUiDropdown = require('semantic-ui-dropdown');

var _semanticUiDropdown2 = _interopRequireDefault(_semanticUiDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.$ = _jquery2.default;
window.$.fn.transition = _semanticUiTransition2.default;
window.$.fn.popup = _semanticUiPopup2.default;
window.$.fn.dropdown = _semanticUiDropdown2.default;

/* eslint-disable react/no-set-state */

var MenuWidget = exports.MenuWidget = function (_React$Component) {
  _inherits(MenuWidget, _React$Component);

  function MenuWidget() {
    _classCallCheck(this, MenuWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuWidget).apply(this, arguments));
  }

  _createClass(MenuWidget, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.refs.popupActivator).popup({
        popup: $(this.refs.popup),
        hoverable: true,
        position: 'bottom right',
        delay: {
          show: 200,
          hide: 800
        }
      });

      $(this.refs.dropdown).dropdown();
    }
  }, {
    key: 'generateMenuLink',
    value: function generateMenuLink(params) {
      return function (item) {
        var route = Object.keys(params).reduce(function (acc, paramName) {
          return acc.replace(':' + paramName, params[paramName]);
        }, item.route);
        return _react2.default.createElement(
          _reactRouter.Link,
          {
            to: route,
            key: item.route,
            onlyActiveOnIndex: !item.index,
            activeClassName: 'active',
            className: 'item'
          },
          _react2.default.createElement('i', { className: item.icon + ' icon' }),
          item.label
        );
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var layout = _props.layout;
      var className = _props.className;
      var color = _props.color;
      var items = _props.items;
      var params = _props.params;
      var title = _props.title;
      var icon = _props.icon;
      var secondaryItems = _props.secondaryItems;


      var menuLink = this.generateMenuLink(params);
      var itemLinks = (items || []).map(menuLink);
      var secondaryItemLinks = (secondaryItems || []).map(menuLink);

      // TODO for the following, the menu needs its own store
      // const querySearch = _.get(location, 'query.search');
      // const triggerSearch = (e) => {
      //   e.preventDefault();
      //   location.query.search = this.refs.search.value;
      //   browserHistory.replace(location);
      // };

      return _react2.default.createElement(
        _Widget2.default,
        {
          _name: 'menu',
          layout: layout,
          className: className
        },
        _react2.default.createElement(
          'div',
          { className: 'ui one column grid' },
          _react2.default.createElement(
            'div',
            { className: 'ui tablet only computer only column' },
            _react2.default.createElement(
              'div',
              { className: 'ui ' + color + ' secondary pointing menu' },
              _react2.default.createElement(
                'a',
                { className: 'header item' },
                _react2.default.createElement(
                  'span',
                  { style: { marginRight: '0.5rem' } },
                  ' ',
                  title,
                  ' '
                ),
                icon ? _react2.default.createElement('i', { className: icon + ' icon' }) : null
              ),
              itemLinks,
              _react2.default.createElement(
                'div',
                { className: 'right menu' },
                secondaryItemLinks.length ? _react2.default.createElement(
                  'div',
                  { className: 'ui dropdown link item', ref: 'dropdown' },
                  _react2.default.createElement(
                    'span',
                    { className: 'text' },
                    _react2.default.createElement('i', { className: 'sidebar icon' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'menu' },
                    secondaryItemLinks
                  )
                ) : null
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'ui mobile only column' },
            _react2.default.createElement(
              'div',
              { className: 'ui popup', ref: 'popup' },
              _react2.default.createElement(
                'div',
                { className: 'ui vertical ' + color + ' menu' },
                _react2.default.createElement(
                  'div',
                  { className: 'ui search item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'ui transparent icon input' },
                    _react2.default.createElement('input', { type: 'text', placeholder: 'Search...' }),
                    _react2.default.createElement('i', { className: 'search link icon' })
                  )
                ),
                itemLinks,
                secondaryItemLinks
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'ui secondary pointing menu' },
              _react2.default.createElement(
                'a',
                { className: 'header item' },
                title,
                _react2.default.createElement('i', { className: icon + ' icon' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'right menu' },
                _react2.default.createElement(
                  'a',
                  { className: 'item', ref: 'popupActivator' },
                  _react2.default.createElement('i', { className: 'sidebar icon' })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return MenuWidget;
}(_react2.default.Component);

MenuWidget.propTypes = _extends({}, _propTypes.routePropTypes, {
  layout: _react.PropTypes.object,
  className: _react.PropTypes.string,
  title: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  color: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired,
    route: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
  })),
  secondaryItems: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired,
    route: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
  }))
});

exports.default = MenuWidget;