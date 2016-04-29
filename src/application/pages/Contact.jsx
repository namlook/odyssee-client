import React, { PropTypes } from 'react';

import { connectPage } from '../../core';
import actions from '../../actions';

import WidgetGrid from '../../core/components/WidgetGrid.jsx';
import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';
import TextWidget from '../../core/components/widgets/TextWidget.jsx';

import WeatherCheckWidget from '../../businessLogic/WeatherCheckWidget';
import AreWeOpenWidget from '../../businessLogic/AreWeOpenWidget';
import NewRecordWidget from '../../businessLogic/NewRecordWidget';
import CollectionListWidget from '../../businessLogic/CollectionListWidget';

export const ApplicationContactPage = (props) => (
  <WidgetGrid>
    <MenuWidget title="contact" />
    <TextWidget title="how to contact us" icon="map">
      <h4>{"you'll find the map here"}</h4>
    </TextWidget>

    <WeatherCheckWidget
      title="current weather"
      name="weather-in-montpellier"
      {...props} />

    <AreWeOpenWidget
      title="are we open ?"
      name="contact-are-we-open"
      linkedStates={{ weatherCheck: "weather-in-montpellier" }}
      {...props} />


    <NewRecordWidget
      title="add participant"
      name="add-participant"
      onSave={(record) => props.storeActions['participants-store'].addRecord(record)}
      {...props} />

    <CollectionListWidget
      title="here are the participants"
      name="participants-list"
      linkedStates={{ records: "participants-store" }}
      {...props} />

    <CollectionListWidget
      title="nobody's here"
      name="other-participants-list"
      linkedStates={{ records: "other-participants-store" }}
      {...props} />

  </WidgetGrid>
);

ApplicationContactPage.propTypes = {
  storeActions: PropTypes.object.isRequired,
};

export default connectPage(actions)(ApplicationContactPage);

// export default connect(
//   (state) => {
//     console.log('!!state', this);
//     return { storeState: state };
//   },
//   (dispatch) => ({
//     storeActions: {
//       WeatherCheckWidget: bindActionCreators(_actions.WeatherCheckWidget, dispatch),
//       NewRecordWidget: bindActionCreators(_actions.NewRecordWidget, dispatch),
//       'participants-store': bindActionCreators(
//         _actions.collectionStore('participants-store'),
//         dispatch,
//       ),
//       'other-participants-store': bindActionCreators(
//         _actions.collectionStore('other-participants-store'),
//         dispatch,
//       ),
//     },
//   }),
// )(ApplicationContactPage);
