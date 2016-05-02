import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';
import ConfirmButtonUI from '../../core/components/ui/ConfirmButtonUI.jsx';

const ParticipantsEditWidget = (props) => {
  const { storeState, link, on } = props;
  const records = storeState[link.collection.from].get(link.collection.to);
  const sortedRecords = records.sort((rec1, rec2) => rec1.position > rec2.position);

  const renameParticipant = (_id, name) => on.rename(_id, { name });
  const moveUpParticipant = (_id) => on.moveUp(_id);
  const moveDownParticipant = (_id) => on.moveDown(_id);
  const deleteParticipant = (_id) => on.delete(_id);

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
  on: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default ParticipantsEditWidget;
