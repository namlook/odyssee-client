// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WidgetGrid from '../../components/WidgetGrid.jsx';
import MenuWidget from '../../components/MenuWidget.jsx';
import TextWidget from '../../components/TextWidget.jsx';

import WeatherCheckWidget from '../../businessLogic/WeatherCheckWidget';
import AreWeOpenWidget from '../../businessLogic/AreWeOpenWidget';
import NewRecordWidget from '../../businessLogic/NewRecordWidget';
import CollectionListWidget from '../../businessLogic/CollectionListWidget';

export const ApplicationContactPage = (props) => (
  <WidgetGrid>
    {console.log('contact props', props)}
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
      listenTo="weather-in-montpellier"
      {...props} />


    <NewRecordWidget
      title="add participant"
      name="add-participant"
      onSave={(record) =>
        props.storeActions['participants-store'].addRecord(record)}
      {...props} />

    <CollectionListWidget
      title="here are the participants"
      name="participants-list"
      recordsStore="participants-store"
      {...props} />

    <CollectionListWidget
      title="nobody's here"
      name="other-participants-list"
      recordsStore="other-participants-store"
      {...props} />

  </WidgetGrid>
);

ApplicationContactPage.propTypes = {
  storeActions: PropTypes.object.isRequired,
};


/** TODO ADD THIS TO THE CORE **/

const registerActions = (dispatch, actions) => (
  Object.keys(actions)
    .map((actionName) => ({ name: actionName, fn: actions[actionName] }))
    .reduce((acc, action) => ({
      ...acc,
      [action.name]: bindActionCreators(action.fn(action.name), dispatch),
    }), {})
);

const connectPage = (actions) => (
  connect(
    (state) => ({
      storeState: state,
    }),
    (dispatch) => ({
      storeActions: registerActions(dispatch, actions),
    }),
  )
);

/** ************************* **/

import _actions from '../../actions';

export default connectPage(_actions)(ApplicationContactPage);

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
