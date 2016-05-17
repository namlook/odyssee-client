'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundPage = function NotFoundPage() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h4',
      null,
      '404 Page Not Found'
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { to: '/' },
      ' Go back to homepage '
    )
  );
};

exports.default = NotFoundPage;