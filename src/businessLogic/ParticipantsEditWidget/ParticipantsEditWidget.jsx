import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget';
import ConfirmButtonUI from '../../components/ui/ConfirmButtonUI';

const ParticipantsEditWidget = (props) => {
  // const { storeState, storeActions, linkedStores, name, on } = props;
  const { participantsStore, participantsActions } = props;
  // const participantsStoreName = linkedStores.participants || name;
  // const records = storeState[participantsStoreName].get('content');
  const records = participantsStore.get('content');
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
  const { updateRecord, deleteRecord, moveUp, moveDown } = participantsActions;

  const renameParticipant = (_id, participantName) => updateRecord(_id, { name: participantName });
  const moveUpParticipant = (_id) => moveUp(_id);
  const moveDownParticipant = (_id) => moveDown(_id);
  const deleteParticipant = (_id) => deleteRecord(_id);

  const disabledMoveUp = (position) => (position >= records.count() - 1 ? 'disabled' : '');
  const disabledMoveDown = (position) => (position <= 0 ? 'disabled' : '');

  return !records.count() ? null : (
    <CardWidget
      _name="participants-edit"
      {...props}
    >

        {records.map((record) => (
          <div key={record._id} className="ui segment">
            <div className="ui form">
              <div className="field">
                <input
                  name="participant"
                  type="text"
                  defaultValue={record.name}
                  onBlur={(e) => renameParticipant(record._id, e.target.value)}
                />
              </div>
            </div>

            <div className="ui hidden divider"></div>

            <div className="container">
              <div className="ui buttons">
                <button className="ui button" onClick={() => moveUpParticipant(record._id)}>
                  <i className={`ui chevron down ${disabledMoveUp(record.position)} icon`}></i>
                </button>
                <button className="ui button" onClick={() => moveDownParticipant(record._id)}>
                  <i className={`ui chevron up ${disabledMoveDown(record.position)} icon`}></i>
                </button>
              </div>

              <ConfirmButtonUI
                className="ui red right floated button"
                displayClassName="basic"
                displayLabel="supprimer"
                confirmLabel="confirmer"
                onConfirm={() => deleteParticipant(record._id)} />
            </div>
          </div>
        ))}

    </CardWidget>
  );
};

ParticipantsEditWidget.propTypes = {
  // on: PropTypes.object,
  participantsStore: PropTypes.object.isRequired,
  participantsActions: PropTypes.object.isRequired,
};

export default ParticipantsEditWidget;
