
// import React, { PropTypes } from 'react';
//
// import { connectPage } from '../../core';
// import actions from '../../actions';
//
// import WidgetGrid from '../../core/components/WidgetGrid.jsx';
// import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';
//
// import { Component as NewRecordWidget } from '../../businessLogic/NewRecordWidget';
// import { Component as ParticipantsEditWidget } from '../../businessLogic/ParticipantsEditWidget';
//
// export const ParticipantsPage = (props) => (
//   <WidgetGrid>
//     <MenuWidget title="Participants" />
//
//     <NewRecordWidget
//       title="add participant"
//       name="add-participant"
//       on={{
//         save: (...args) => props.storeActions['participants-store'].addRecord(...args),
//       }}
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }}
//       {...props} />
//
//     <ParticipantsEditWidget
//       title="All the participants"
//       icon="users"
//       name="participants-edit-list"
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }} // use to diplay the records
//       on={{
//         rename: (...args) => props.storeActions['participants-store'].updateRecord(...args),
//         delete: (...args) => props.storeActions['participants-store'].deleteRecord(...args),
//         moveUp: (...args) => props.storeActions['participants-store'].moveUp(...args),
//         moveDown: (...args) => props.storeActions['participants-store'].moveDown(...args),
//       }}
//       {...props} />
//
//   </WidgetGrid>
// );
//
// ParticipantsPage.propTypes = {
//   storeActions: PropTypes.object.isRequired,
// };


// export default connectPage(actions)(ParticipantsPage);

import generatePageComponent from '../../core/generate-page-component';
export default generatePageComponent('application.participants');
