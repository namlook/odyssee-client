'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _CardWidget = require('../../core/components/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

var _FormField = require('../../core/components/contrib/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _utils = require('../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var storeToQuery = function storeToQuery(exposeStateToRouteQuery, store) {
  return Object.keys(exposeStateToRouteQuery).reduce(function (acc, propertyName) {
    var value = store.get(propertyName);
    if (value) {
      return _extends({}, acc, _defineProperty({}, exposeStateToRouteQuery[propertyName], value));
    }
    return acc;
  }, {});
};

var RecordFormWidget = function (_React$Component) {
  _inherits(RecordFormWidget, _React$Component);

  function RecordFormWidget() {
    _classCallCheck(this, RecordFormWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RecordFormWidget).apply(this, arguments));
  }

  _createClass(RecordFormWidget, [{
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
      var location = _props.location;
      var exposeStateToRouteQuery = _props.exposeStateToRouteQuery;
      var ownActions = _props.ownActions;


      if (collectionStore && linkedRouteParams) {
        // fill form from url params
        var requestedRecord = (0, _utils.findRecordFromStore)(collectionStore, linkedRouteParams, params);
        if (requestedRecord) {
          ownActions.update(requestedRecord);
        } else if (linkedRouteParams) {
          ownActions.clear();
        }
      } else if (exposeStateToRouteQuery) {
        // fill form from url query
        Object.keys(exposeStateToRouteQuery).forEach(function (storePropertyName) {
          var queryFilterName = exposeStateToRouteQuery[storePropertyName];
          ownActions.updateProperty(storePropertyName, location.query[queryFilterName]);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var collectionActions = _props2.collectionActions;
      var ownStore = _props2.ownStore;
      var ownActions = _props2.ownActions;
      var fields = _props2.fields;
      var location = _props2.location;
      var onSaveRedirectTo = _props2.onSaveRedirectTo;
      var onCancelRedirectTo = _props2.onCancelRedirectTo;
      var displaySubmitButtons = _props2.displaySubmitButtons;
      var exposeStateToRouteQuery = _props2.exposeStateToRouteQuery;

      var other = _objectWithoutProperties(_props2, ['collectionActions', 'ownStore', 'ownActions', 'fields', 'location', 'onSaveRedirectTo', 'onCancelRedirectTo', 'displaySubmitButtons', 'exposeStateToRouteQuery']);

      var recordState = ownStore;

      var clearRecord = function clearRecord() {
        return ownActions.update({ _id: recordState._id });
      };

      var triggerClear = function triggerClear(e) {
        e.preventDefault();
        e.stopPropagation();
        clearRecord();
      };

      var triggerSave = function triggerSave(e) {
        e.preventDefault();
        if (collectionActions) {
          collectionActions.addRecord(recordState);
        }
        if (exposeStateToRouteQuery) {
          location.query = storeToQuery(exposeStateToRouteQuery, recordState);
          _reactRouter.browserHistory.replace(location);
        }
        ownActions.clear();
        if (onSaveRedirectTo) {
          var redirectUrl = onSaveRedirectTo;
          if (recordState._id) {
            redirectUrl = onSaveRedirectTo.replace(':id', recordState._id);
          }
          _reactRouter.browserHistory.push(redirectUrl);
        }
      };

      var triggerCancel = function triggerCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        ownActions.clear();
        var cancelRedirect = onCancelRedirectTo || onSaveRedirectTo;
        if (cancelRedirect) {
          var redirectUrl = cancelRedirect;
          if (recordState._id) {
            redirectUrl = cancelRedirect.replace(':id', recordState._id);
          }
          _reactRouter.browserHistory.push(redirectUrl);
        }
      };

      var triggerChange = function triggerChange() {
        ownActions.updateProperty.apply(ownActions, arguments);
      };

      var submitButtons = void 0;
      if (displaySubmitButtons) {
        submitButtons = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'ui right floated primary button' },
            'save'
          ),
          _react2.default.createElement(
            'button',
            { name: 'cancel', className: 'ui basic red button', onClick: triggerCancel },
            'cancel'
          ),
          _react2.default.createElement(
            'button',
            { name: 'clear', className: 'ui basic button', onClick: triggerClear },
            'clear'
          )
        );
      }

      return _react2.default.createElement(
        _CardWidget2.default,
        _extends({
          _name: 'new-record'
        }, other),
        _react2.default.createElement(
          'form',
          { className: 'ui form segment', onSubmit: triggerSave },
          _react2.default.createElement(
            'div',
            { className: 'three fields' },
            fields.map(function (field) {
              return _react2.default.createElement(_FormField2.default, {
                key: field.name,
                name: field.name,
                label: field.label,
                type: field.type,
                value: recordState[field.name],
                onChange: triggerChange });
            })
          ),
          submitButtons
        )
      );
    }
  }]);

  return RecordFormWidget;
}(_react2.default.Component);

RecordFormWidget.propTypes = {
  location: _react.PropTypes.object.isRequired,
  params: _react.PropTypes.object.isRequired,
  exposeStateToRouteQuery: _react.PropTypes.object,
  linkedRouteParams: _react.PropTypes.object,
  onSaveClearForm: _react.PropTypes.bool,
  onSaveRedirectTo: _react.PropTypes.string,
  onCancelRedirectTo: _react.PropTypes.string,
  ownStore: _react.PropTypes.object,
  ownActions: _react.PropTypes.object,
  collectionStore: _react.PropTypes.object,
  collectionActions: _react.PropTypes.object,
  fields: _react.PropTypes.array.isRequired,
  displaySubmitButtons: _react.PropTypes.bool
};

exports.default = RecordFormWidget;