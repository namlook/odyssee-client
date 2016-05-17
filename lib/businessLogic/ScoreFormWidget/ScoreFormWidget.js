'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Widget = require('../../components/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _DropdownUI = require('../../components/ui/DropdownUI');

var _DropdownUI2 = _interopRequireDefault(_DropdownUI);

var _propTypes = require('../../utils/prop-types');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import FormField from '../../components/contrib/FormField.jsx';

var computeNextParticipant = function computeNextParticipant(participants, currentRecord) {
  var currentParticipantIndex = participants.indexOf(participants.find(function (o) {
    return o.name === currentRecord.participant;
  }));
  var nextParticipantIndex = currentParticipantIndex + 1 < participants.count() ? currentParticipantIndex + 1 : 0;

  return participants.get(nextParticipantIndex);
};

var ScoreFormWidget = function (_React$Component) {
  _inherits(ScoreFormWidget, _React$Component);

  function ScoreFormWidget() {
    _classCallCheck(this, ScoreFormWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreFormWidget).apply(this, arguments));
  }

  _createClass(ScoreFormWidget, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var participantsStore = this.props.participantsStore;

      var participants = participantsStore.get('content');
      if (!participants.count()) {
        _reactRouter.browserHistory.push('/participants');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var formStore = _props.formStore;
      var ownStore = _props.ownStore;
      var scoresStore = _props.scoresStore;
      var participantsStore = _props.participantsStore;
      var formActions = _props.formActions;
      var ownActions = _props.ownActions;
      var scoresActions = _props.scoresActions;
      var params = _props.params;

      var other = _objectWithoutProperties(_props, ['formStore', 'ownStore', 'scoresStore', 'participantsStore', 'formActions', 'ownActions', 'scoresActions', 'params']);

      // stores


      var _record = formStore || ownStore;
      var scores = scoresStore.get('content');
      var participants = participantsStore.get('content');

      if (!participants.count()) {
        return null;
      }

      // Actions
      var actions = formActions || ownActions;
      var onChange = actions.update;
      var onSave = scoresActions.addRecord;

      // variables
      var record = _record.set('score', _record.score || 0).set('participant', _record.participant || participants.get(0).name);

      if (!record.at) {
        record = record.set('at', Date.now());
      }

      var sortedCollection = scores.sort(function (p, n) {
        return p.at > n.at;
      });
      var currentRecord = scores.find(function (r) {
        return r._id === params.id;
      }) || {};
      var currentIndex = sortedCollection.indexOf(currentRecord);

      // Inner actions
      var toPreviousRecord = function toPreviousRecord() {
        var previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
        var previousRecord = sortedCollection.get(previousIndex);
        if (previousRecord) {
          _reactRouter.browserHistory.push('/scores/' + previousRecord._id);
          onChange(previousRecord);
        }
      };

      var toNextRecord = function toNextRecord() {
        onSave(record);
        if (currentIndex + 1 < scores.count()) {
          var nextIndex = currentIndex + 1;
          var nextRecord = sortedCollection.get(nextIndex);
          _reactRouter.browserHistory.push('/scores/' + nextRecord._id);
          onChange(nextRecord);
        } else {
          _reactRouter.browserHistory.push('/scores/new');
          var nextParticipant = computeNextParticipant(participants, record);
          onChange({ participant: nextParticipant.name });
        }
      };

      var updateParticipant = function updateParticipant(_id, participantName) {
        return onChange(record.set('participant', participantName));
      };

      var changeScore = function changeScore(operation, value) {
        return function () {
          var score = record.score || 0;
          var newScore = void 0;
          if (operation === '+') {
            newScore = score + value;
            newScore = newScore < 0 ? 0 : newScore;
          } else if (operation === '*') {
            newScore = score !== 0 ? score * value : score;
          } else if (operation === '/') {
            newScore = score !== 0 ? score * value : score;
            newScore = newScore < 1 ? score : Math.floor(newScore);
          } else if (operation === '=') {
            newScore = value;
          }
          onChange(record.set('score', newScore));
        };
      };

      var triggerSave = function triggerSave() {
        if (record.participant) {
          onSave(record);
          var nextParticipant = computeNextParticipant(participants, record);
          onChange({ participant: nextParticipant.name });
        }
      };

      // partials
      var header = currentRecord.participant ? _react2.default.createElement(
        'h1',
        null,
        currentRecord.participant
      ) : _react2.default.createElement(
        _DropdownUI2.default,
        { className: 'item selection', onChange: updateParticipant },
        _react2.default.createElement('input', { type: 'hidden', name: 'participant' }),
        _react2.default.createElement(
          'div',
          { className: 'text', style: { fontSize: '2rem' } },
          record.participant
        ),
        _react2.default.createElement('i', { className: 'ui small dropdown icon' }),
        _react2.default.createElement(
          'div',
          { className: 'menu' },
          participants.map(function (_ref) {
            var _id = _ref._id;
            var name = _ref.name;
            return _react2.default.createElement(
              'div',
              { className: 'item active', dataValue: name, key: _id },
              name
            );
          })
        )
      );

      var displayScore = record.score < 0 ? record.score * -1 : record.score || 0;
      var disabledBackButton = currentIndex < 0 && !scores.count() || currentIndex === 0;

      var backButton = !record._id ? _react2.default.createElement(
        'button',
        {
          className: 'ui item ' + (disabledBackButton ? 'disabled' : '') + ' button',
          onClick: toPreviousRecord
        },
        _react2.default.createElement('i', { className: 'ui big delete icon' })
      ) : _react2.default.createElement(
        'button',
        {
          className: 'ui item ' + (disabledBackButton ? 'disabled' : '') + ' button',
          onClick: function onClick() {
            onSave(record);toPreviousRecord();
          }
        },
        _react2.default.createElement('i', { className: 'ui big arrow left icon' })
      );

      var saveButton = !record._id ? _react2.default.createElement(
        'button',
        { className: 'ui item button', onClick: triggerSave },
        _react2.default.createElement('i', { className: 'ui big check icon' })
      ) : _react2.default.createElement(
        'button',
        { className: 'ui item button', onClick: toNextRecord },
        _react2.default.createElement('i', { className: 'ui big arrow right icon' })
      );

      // styles
      var buttonStyle = { fontSize: '2rem' };
      var minusButtonStyle = {
        fontSize: '9rem',
        padding: 0,
        paddingRight: '1rem',
        color: record.score < 0 ? '#000' : 'rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
      };

      return _react2.default.createElement(
        _Widget2.default,
        _extends({
          _name: 'new-record'
        }, other),
        _react2.default.createElement(
          'div',
          { className: 'ui three item secondary menu' },
          backButton,
          header,
          saveButton
        ),
        _react2.default.createElement(
          'div',
          { className: 'ui form basic segment' },
          _react2.default.createElement(
            'div',
            { className: 'field' },
            _react2.default.createElement(
              'div',
              { className: 'ui center aligned container' },
              _react2.default.createElement(
                'h1',
                { style: { fontSize: '9rem' } },
                _react2.default.createElement(
                  'div',
                  { className: 'ui buttons' },
                  _react2.default.createElement(
                    'button',
                    {
                      style: minusButtonStyle,
                      className: 'ui button',
                      onClick: changeScore('*', -1)
                    },
                    '-'
                  )
                ),
                displayScore
              ),
              _react2.default.createElement(
                'button',
                { className: 'ui basic button', onClick: changeScore('=', 0) },
                'reset'
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'ui buttons' },
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('+', -1)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron left icon' })
                  ),
                  _react2.default.createElement(
                    'button',
                    { style: buttonStyle, className: 'ui basic disabled button' },
                    '+1'
                  ),
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('+', 1)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron right icon' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'ui buttons' },
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('+', -5)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron left icon' })
                  ),
                  _react2.default.createElement(
                    'button',
                    { style: buttonStyle, className: 'ui basic disabled button' },
                    '+5'
                  ),
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('+', 5)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron right icon' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'ui buttons' },
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('/', 10)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron left icon' })
                  ),
                  _react2.default.createElement(
                    'button',
                    { style: buttonStyle, className: 'ui basic disabled button' },
                    'x10'
                  ),
                  _react2.default.createElement(
                    'button',
                    {
                      className: 'ui basic button',
                      style: buttonStyle,
                      onClick: changeScore('*', 10)
                    },
                    _react2.default.createElement('i', { className: 'ui chevron right icon' })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ScoreFormWidget;
}(_react2.default.Component);

ScoreFormWidget.propTypes = _extends({}, _propTypes.routePropTypes, (0, _propTypes.ownPropTypes)('fromStore'), {

  formStore: _react.PropTypes.object,
  scoresStore: _react.PropTypes.object.isRequired,
  participantsStore: _react.PropTypes.object.isRequired,
  formActions: _react.PropTypes.object,
  fields: _react.PropTypes.array.isRequired,
  displaySubmitButtons: _react.PropTypes.bool
});

exports.default = ScoreFormWidget;