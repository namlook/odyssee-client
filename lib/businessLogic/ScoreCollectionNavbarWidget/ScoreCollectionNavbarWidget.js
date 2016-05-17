'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Widget = require('../../core/components/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _FormField = require('../../core/components/contrib/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _propTypes = require('../../core/utils/prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ScoreCollectionNavbarWidget = function ScoreCollectionNavbarWidget(props) {
  var storeState = props.storeState;
  var storeActions = props.storeActions;
  var link = props.link;
  var params = props.params;
  var on = props.on;

  var other = _objectWithoutProperties(props, ['storeState', 'storeActions', 'link', 'params', 'on']);

  var collection = storeState[link.collectionStore.from].get('records');
  var record = storeState[link.recordStore.from];
  var sortedCollection = collection.sort(function (p, n) {
    return p.at > n.at;
  });
  var currentRecord = collection.find(function (r) {
    return r._id === params.id;
  }) || {};
  var currentIndex = sortedCollection.indexOf(currentRecord);

  var onChange = storeActions[on.change.on][on.change.dispatch];

  var toPreviousRecord = function toPreviousRecord() {
    var previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    var previousRecord = sortedCollection.get(previousIndex);
    _reactRouter.browserHistory.push('/scores/' + previousRecord._id);
    onChange(previousRecord);
  };

  var toNextRecord = function toNextRecord() {
    if (currentIndex + 1 < collection.count()) {
      var nextIndex = currentIndex + 1;
      var nextRecord = sortedCollection.get(nextIndex);
      _reactRouter.browserHistory.push('/scores/' + nextRecord._id);
      onChange(nextRecord);
    } else {
      _reactRouter.browserHistory.push('/scores/new');
      onChange({});
    }
  };

  var updateParticipant = function updateParticipant(propertyName, name) {
    return onChange(record.set('participant', name));
  };

  var header = currentRecord.participant ? currentRecord.participant : _react2.default.createElement(
    'div',
    { className: 'ui form' },
    _react2.default.createElement(_FormField2.default, { name: 'participant', value: record.participant, onChange: updateParticipant })
  );

  return _react2.default.createElement(
    _Widget2.default,
    _extends({ _name: 'collection-list' }, other),
    _react2.default.createElement(
      'div',
      { className: 'ui three item menu' },
      _react2.default.createElement(
        'button',
        { className: 'ui item button', onClick: toPreviousRecord },
        _react2.default.createElement('i', { className: 'ui arrow left icon' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'item' },
        header
      ),
      _react2.default.createElement(
        'button',
        { className: 'ui item button', onClick: toNextRecord },
        _react2.default.createElement('i', { className: 'ui arrow right icon' })
      )
    )
  );
};

ScoreCollectionNavbarWidget.propTypes = _extends({}, _propTypes.routePropTypes, {
  storeState: _react.PropTypes.object.isRequired,
  storeActions: _react.PropTypes.object.isRequired,
  link: _react.PropTypes.object.isRequired
});

exports.default = ScoreCollectionNavbarWidget;