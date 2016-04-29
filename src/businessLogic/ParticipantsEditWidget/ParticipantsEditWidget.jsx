import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';
import ConfirmButtonUI from '../../core/components/ui/ConfirmButtonUI.jsx';

const ParticipantsEditWidget = (props) => {
  const { storeState, linkedStates, on } = props;
  const records = storeState[linkedStates.records].get('records');

  const renameParticipant = (_id, name) => on.rename(_id, { name });
  const moveUpParticipant = (_id) => on.moveUp(_id);
  const moveDownParticipant = (_id) => on.moveDown(_id);
  const deleteParticipant = (_id) => on.delete(_id);

  return !records.count() ? null : (
    <CardWidget
      _name="participants-edit"
      {...props}
    >

        {records.map(({ _id, name }) => (
          <div key={_id} className="ui segment">
            <div className="ui form">
              <div className="field">
                <input
                  name="participant"
                  type="text"
                  defaultValue={name}
                  onBlur={(e) => renameParticipant(_id, e)}
                />
              </div>
            </div>

            <div className="ui hidden divider"></div>

            <div className="container">
              <div className="ui buttons">
                <button className="ui button" onClick={() => moveUpParticipant(_id)}>
                  <i className="ui chevron up icon"></i>
                </button>
                <button className="ui button" onClick={() => moveDownParticipant(_id)}>
                  <i className="ui chevron down icon"></i>
                </button>
              </div>

              <ConfirmButtonUI
                className="ui red right floated button"
                displayClassName="basic"
                displayLabel="supprimer"
                confirmLabel="confirmer"
                onConfirm={() => deleteParticipant(_id)} />
            </div>
          </div>
        ))}

    </CardWidget>
  );
};

ParticipantsEditWidget.propTypes = {
  on: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  linkedStates: PropTypes.object.isRequired,
};

export default ParticipantsEditWidget;
