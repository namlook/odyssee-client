'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardWidget = require('../../components/widgets/CardWidget');

var _CardWidget2 = _interopRequireDefault(_CardWidget);

var _ConfirmButtonUI = require('../../components/ui/ConfirmButtonUI');

var _ConfirmButtonUI2 = _interopRequireDefault(_ConfirmButtonUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParticipantsEditWidget = function ParticipantsEditWidget(props) {
  // const { storeState, storeActions, linkedStores, name, on } = props;
  var participantsStore = props.participantsStore;
  var participantsActions = props.participantsActions;
  // const participantsStoreName = linkedStores.participants || name;
  // const records = storeState[participantsStoreName].get('content');

  var records = participantsStore.get('content');
  //
  // let onRename;
  // let onDelete;
  // let onMoveUp;
  // let onMoveDown;
  // if (on) {
  //   onRename = storeActions[on.rename.on][on.rename.dispatch];
  //   onDelete = storeActions[on.delete.on][on.delete.dispatch];
  //   onMoveUp = storeActions[on.moveUp.on][on.moveUp.dispatch];
  //   onMoveDown = storeActions[on.moveDown.on][on.moveDown.dispatch];
  // } else {
  //   onRename = storeActions[participantsStoreName].updateRecord;
  //   onDelete = storeActions[participantsStoreName].deleteRecord;
  //   onMoveUp = storeActions[participantsStoreName].moveUp;
  //   onMoveDown = storeActions[participantsStoreName].moveDown;
  // }
  var updateRecord = participantsActions.updateRecord;
  var deleteRecord = participantsActions.deleteRecord;
  var moveUp = participantsActions.moveUp;
  var moveDown = participantsActions.moveDown;


  var renameParticipant = function renameParticipant(_id, participantName) {
    return updateRecord(_id, { name: participantName });
  };
  var moveUpParticipant = function moveUpParticipant(_id) {
    return moveUp(_id);
  };
  var moveDownParticipant = function moveDownParticipant(_id) {
    return moveDown(_id);
  };
  var deleteParticipant = function deleteParticipant(_id) {
    return deleteRecord(_id);
  };

  var disabledMoveUp = function disabledMoveUp(position) {
    return position >= records.count() - 1 ? 'disabled' : '';
  };
  var disabledMoveDown = function disabledMoveDown(position) {
    return position <= 0 ? 'disabled' : '';
  };

  return !records.count() ? null : _react2.default.createElement(
    _CardWidget2.default,
    _extends({
      _name: 'participants-edit'
    }, props),
    records.map(function (record) {
      return _react2.default.createElement(
        'div',
        { key: record._id, className: 'ui segment' },
        _react2.default.createElement(
          'div',
          { className: 'ui form' },
          _react2.default.createElement(
            'div',
            { className: 'field' },
            _react2.default.createElement('input', {
              name: 'participant',
              type: 'text',
              defaultValue: record.name,
              onBlur: function onBlur(e) {
                return renameParticipant(record._id, e.target.value);
              }
            })
          )
        ),
        _react2.default.createElement('div', { className: 'ui hidden divider' }),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'ui buttons' },
            _react2.default.createElement(
              'button',
              { className: 'ui button', onClick: function onClick() {
                  return moveUpParticipant(record._id);
                } },
              _react2.default.createElement('i', { className: 'ui chevron down ' + disabledMoveUp(record.position) + ' icon' })
            ),
            _react2.default.createElement(
              'button',
              { className: 'ui button', onClick: function onClick() {
                  return moveDownParticipant(record._id);
                } },
              _react2.default.createElement('i', { className: 'ui chevron up ' + disabledMoveDown(record.position) + ' icon' })
            )
          ),
          _react2.default.createElement(_ConfirmButtonUI2.default, {
            className: 'ui red right floated button',
            displayClassName: 'basic',
            displayLabel: 'supprimer',
            confirmLabel: 'confirmer',
            onConfirm: function onConfirm() {
              return deleteParticipant(record._id);
            } })
        )
      );
    })
  );
};

ParticipantsEditWidget.propTypes = {
  // on: PropTypes.object,
  participantsStore: _react.PropTypes.object.isRequired,
  participantsActions: _react.PropTypes.object.isRequired
};

exports.default = ParticipantsEditWidget;