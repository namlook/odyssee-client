import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/Widget.jsx';

const AddParticipantWidget = (props) => {
  const { storeState, linkedStates, on } = props;
  const { records } = storeState[linkedStates.records];

  const renameParticipant = (record) => on.rename(record);
  const moveUpParticipant = (record) => on.moveUp(record);
  const moveDownParticipant = (record) => on.moveDown(record);
  // const deleteParticipant = (record) => on.delete(record);

  return !records.length ? null : (
    <CardWidget
      _name="text"
      {...props}
    >
      <div className="ui segments">
        {records.map((participant) => (
          <div key={participant} className="ui segment">
            <div className="ui form">
              <div className="field">
                <input
                  name="participant"
                  type="text"
                  defaultValue={participant}
                  onBlur={(e) => renameParticipant(e)}
                />
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <div className="container">
              <div className="ui buttons">
                <button className="ui button" onClick={() => moveUpParticipant(participant)}>
                  <i className="ui chevron up icon"></i>
                </button>
                <button className="ui button" onClick={() => moveDownParticipant(participant)}>
                  <i className="ui chevron down icon"></i>
                </button>
              </div>
              {/*
              <ConfirmButton
                className="ui red right floated button"
                displayClassName="basic"
                displayLabel="supprimer"
                confirmLabel="confirmer"
                onConfirm={deleteParticipant} />
              */}
            </div>
          </div>
        ))}
      </div>
    </CardWidget>
  );
};

AddParticipantWidget.propTypes = {
  on: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  linkedStates: PropTypes.object.isRequired,
};

export default AddParticipantWidget;
