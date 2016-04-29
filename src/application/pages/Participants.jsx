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
      onSave={(record) => props.storeActions['participants-store'].addRecord(record)}
      {...props} />

    <ParticipantsEditWidget
      title="All the participants"
      icon="users"
      name="participants-edit-list"
      linkedStates={{ records: "participants-store" }} // use to diplay the records
      on={{
        rename: (record) => props.storeActions['participants-store'].updateRecord(record),
        moveUp: (record) => props.storeActions['participants-store'].updateRecord(record),
        moveDown: (record) => props.storeActions['participants-store'].updateRecord(record),
        delete: (record) => props.storeActions['participants-store'].deleteRecord(record),
      }}
      {...props} />

  </WidgetGrid>
);

ParticipantsPage.propTypes = {
  storeActions: PropTypes.object.isRequired,
};


export default connectPage(actions)(ParticipantsPage);
