'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('../utils/prop-types');

var _semanticUi = require('../utils/semantic-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var layout2semanticClassNames = function layout2semanticClassNames(_ref) {
  var mobile = _ref.mobile;
  var tablet = _ref.tablet;
  var computer = _ref.computer;

  var mobileColumn = void 0;
  if (mobile === 0) {
    mobileColumn = '';
  } else {
    var mobileOnly = tablet === 0 || computer === 0 ? 'only' : '';
    mobileColumn = (0, _semanticUi.number2semanticClassName)(mobile) + ' wide mobile ' + mobileOnly;
  }

  var tabletColumn = void 0;
  if (tablet === 0) {
    tabletColumn = '';
  } else {
    var tabletOnly = mobile === 0 || computer === 0 ? 'only' : '';
    tabletColumn = _lodash2.default.isNil(tablet) ? (0, _semanticUi.number2semanticClassName)(mobile) + ' wide tablet ' + tabletOnly : (0, _semanticUi.number2semanticClassName)(tablet) + ' wide tablet ' + tabletOnly;
  }

  var computerColumn = void 0;
  if (computer === 0) {
    computerColumn = '';
  } else {
    var computerOnly = mobile === 0 || tablet === 0 ? 'only' : '';
    computerColumn = _lodash2.default.isNil(computer) ? (0, _semanticUi.number2semanticClassName)(tablet) + ' wide computer ' + computerOnly : (0, _semanticUi.number2semanticClassName)(computer) + ' wide computer ' + computerOnly;
  }

  return mobileColumn + ' ' + tabletColumn + ' ' + computerColumn + ' column';
};

var Widget = function Widget(props) {
  var layout = props.layout;
  var overwriteClassName = props.overwriteClassName;
  var className = props.className;
  var _name = props._name;
  var style = props.style;
  var children = props.children;

  var other = _objectWithoutProperties(props, ['layout', 'overwriteClassName', 'className', '_name', 'style', 'children']);

  var _layout = layout || { mobile: 16 };
  var _className = overwriteClassName ? className : layout2semanticClassNames(_layout) + ' ' + (className || '');
  var componentClassName = _className + ' ' + _name + '-ods-widget';

  return _react2.default.createElement(
    'div',
    _extends({ style: style, className: componentClassName }, other),
    children
  );
};

Widget.propTypes = _extends({}, _propTypes.routePropTypes, {
  className: _react2.default.PropTypes.string,
  _name: _react2.default.PropTypes.string,
  overwriteClassName: _react2.default.PropTypes.bool,
  layout: _react.PropTypes.object,
  children: _react.PropTypes.node,
  style: _react.PropTypes.object
});

exports.default = Widget;