'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Widget = require('../Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _semanticUi = require('../../utils/semantic-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MobileApplicationMenuWidget = function MobileApplicationMenuWidget(props) {
  var color = props.color || '';
  var items = props.items || [];

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

  var itemsNumber = (0, _semanticUi.number2semanticClassName)(items.length);
  var itemLinks = items.map(generateMenuLink);

  return _react2.default.createElement(
    _Widget2.default,
    {
      _name: 'mobile-application-menu',
      layout: props.layout,
      className: props.className,
      style: { marginBottom: '4rem' }
    },
    _react2.default.createElement(
      'div',
      { className: 'ui ' + itemsNumber + ' item bottom fixed labeled icon ' + color + ' inverted menu' },
      itemLinks
    )
  );
};

MobileApplicationMenuWidget.propTypes = {
  layout: _react.PropTypes.object,
  className: _react.PropTypes.string,
  color: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired,
    route: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.string
  }))
};

exports.default = MobileApplicationMenuWidget;