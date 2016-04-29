// import React, { PropTypes } from 'react';

import React, { PropTypes } from 'react';

import { connectPage } from '../../core';
import actions from '../../actions';

import WidgetGrid from '../../core/components/WidgetGrid.jsx';
import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';

import NewRecordWidget from '../../businessLogic/NewRecordWidget';
import ParticipantsEditWidget from '../../businessLogic/ParticipantsEditWidget';

export const ParticipantsPage = (props) => (
  <WidgetGrid>
    <MenuWidget title="Participants" />

    <NewRecordWidget
      title="add participant"
      name="add-participant"
      on={{
        save: (...args) => props.storeActions['participants-store'].addRecord(...args),
      }}
      {...props} />

    <ParticipantsEditWidget
      title="All the participants"
      icon="users"
      name="participants-edit-list"
      linkedStates={{ collection: "participants-store" }} // use to diplay the records
      on={{
        rename: (...args) => props.storeActions['participants-store'].updateRecord(...args),
        // moveUp: (...args) => props.storeActions['participants-store'].updateRecord(...args),
        // moveDown: (...args) => props.storeActions['participants-store'].updateRecord(...args),
        delete: (...args) => props.storeActions['participants-store'].deleteRecord(...args),
      }}
      {...props} />

  </WidgetGrid>
);

ParticipantsPage.propTypes = {
  storeActions: PropTypes.object.isRequired,
};


export default connectPage(actions)(ParticipantsPage);
