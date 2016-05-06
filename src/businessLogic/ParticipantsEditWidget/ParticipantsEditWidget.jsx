import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';
import ConfirmButtonUI from '../../core/components/ui/ConfirmButtonUI.jsx';

const ParticipantsEditWidget = (props) => {
  const { storeState, storeActions, link, name, on } = props;
  const participantsStoreName = link.participants || name;
  const records = storeState[participantsStoreName].get('content');
  const sortedRecords = records.sort((rec1, rec2) => rec1.position > rec2.position);

  let onRename;
  let onDelete;
  let onMoveUp;
  let onMoveDown;
  if (on) {
    onRename = storeActions[on.rename.on][on.rename.dispatch];
    onDelete = storeActions[on.delete.on][on.delete.dispatch];
    onMoveUp = storeActions[on.moveUp.on][on.moveUp.dispatch];
    onMoveDown = storeActions[on.moveDown.on][on.moveDown.dispatch];
  } else {
    onRename = storeActions[participantsStoreName].updateRecord;
    onDelete = storeActions[participantsStoreName].deleteRecord;
    onMoveUp = storeActions[participantsStoreName].moveUp;
    onMoveDown = storeActions[participantsStoreName].moveDown;
  }

  const renameParticipant = (_id, participantName) => onRename(_id, { name: participantName });
  const moveUpParticipant = (_id) => onMoveUp(_id);
  const moveDownParticipant = (_id) => onMoveDown(_id);
  const deleteParticipant = (_id) => onDelete(_id);

  const disabledMoveUp = (position) => (position >= records.count() - 1 ? 'disabled' : '');
  const disabledMoveDown = (position) => (position <= 0 ? 'disabled' : '');

  return !records.count() ? null : (
    <CardWidget
      _name="participants-edit"
      {...props}
    >

        {sortedRecords.map((record) => (
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
  name: PropTypes.string,
  on: PropTypes.object,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default ParticipantsEditWidget;
