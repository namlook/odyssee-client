'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardWidget = require('../../components/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordDisplayWidget = function (_React$Component) {
  _inherits(RecordDisplayWidget, _React$Component);

  function RecordDisplayWidget() {
    _classCallCheck(this, RecordDisplayWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RecordDisplayWidget).apply(this, arguments));
  }

  _createClass(RecordDisplayWidget, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initStore();
    }
  }, {
    key: 'initStore',
    value: function initStore() {
      var _props = this.props;
      var params = _props.params;
      var collectionStore = _props.collectionStore;
      var linkedRouteParams = _props.linkedRouteParams;
      var ownActions = _props.ownActions;

      var requestedRecord = (0, _utils.findRecordFromStore)(collectionStore, linkedRouteParams, params);
      if (requestedRecord) {
        ownActions.update(requestedRecord);
      } else {
        ownActions.clear();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var ownStore = _props2.ownStore;
      var fields = _props2.fields;

      var other = _objectWithoutProperties(_props2, ['ownStore', 'fields']);

      var recordState = ownStore;

      return _react2.default.createElement(
        _CardWidget2.default,
        _extends({
          _name: 'new-record'
        }, other),
        fields.map(function (field) {
          return _react2.default.createElement(
            'div',
            { key: field.name, className: 'ui segment' },
            _react2.default.createElement(
              'h3',
              null,
              field.label
            ),
            recordState[field.name]
          );
        })
      );
    }
  }]);

  return RecordDisplayWidget;
}(_react2.default.Component);

RecordDisplayWidget.propTypes = {
  params: _react.PropTypes.object.isRequired,
  linkedRouteParams: _react.PropTypes.object,
  ownStore: _react.PropTypes.object.isRequired,
  ownActions: _react.PropTypes.object.isRequired,
  collectionStore: _react.PropTypes.object,
  fields: _react.PropTypes.array.isRequired
};

exports.default = RecordDisplayWidget;