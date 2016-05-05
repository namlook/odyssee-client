//
// import React, { PropTypes } from 'react';
//
// import { connectPage } from '../../core';
// import actions from '../../actions';
//
// import WidgetGrid from '../../core/components/WidgetGrid.jsx';
// import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';
// import HeaderWidget from '../../core/components/widgets/HeaderWidget.jsx';
//
// import { Component as NewRecordWidget } from '../../businessLogic/NewRecordWidget';
// import { Component as ParticipantsEditWidget } from '../../businessLogic/ParticipantsEditWidget';
//
// const NewRecordWidgetConnected = connectPage(actions)(NewRecordWidget);
// const ParticipantsEditWidgetConnected = connectPage(actions)(ParticipantsEditWidget);
//
// export const ParticipantsPage = (props) => (
//   <WidgetGrid>
//     <MenuWidget title="Participants" />
//
//     <NewRecordWidgetConnected
//       title="add participant"
//       name="add-participant"
//       // on={{
//       //   save: (...args) => props.storeActions['participants-store'].addRecord(...args),
//       // }}
//       on={{
//         save: { dispatch: 'addRecord', on: 'participants-store' },
//       }}
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }}
//       {...props} />
//
//     <HeaderWidget title="bouh!" icon="smile" subtitle="ahahaha" color="teal" />
//
//     <ParticipantsEditWidgetConnected
//       title="All the participants"
//       icon="users"
//       name="participants-edit-list"
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }} // use to diplay the records
//       // on={{
//       //   rename: (...args) => props.storeActions['participants-store'].updateRecord(...args),
//       //   delete: (...args) => props.storeActions['participants-store'].deleteRecord(...args),
//       //   moveUp: (...args) => props.storeActions['participants-store'].moveUp(...args),
//       //   moveDown: (...args) => props.storeActions['participants-store'].moveDown(...args),
//       // }}
//       on={{
//         rename: { dispatch: 'updateRecord', on: 'participants-store' },
//         delete: { dispatch: 'deleteRecord', on: 'participants-store' },
//         moveUp: { dispatch: 'moveUp', on: 'participants-store' },
//         moveDown: { dispatch: 'moveDown', on: 'participants-store' },
//       }}
//       {...props} />
//
//   </WidgetGrid>
// );
//
// ParticipantsPage.propTypes = {
//   storeActions: PropTypes.object.isRequired,
// };
//
// export default ParticipantsPage;
// export default connectPage(actions)(ParticipantsPage);

// import generatePageComponent from '../../core/generate-page-component';
// import { generatePageComponent } from '../../core';
// export default generatePageComponent('application.participants');
