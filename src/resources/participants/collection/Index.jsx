// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/app';

import WidgetGrid from '../../../components/WidgetGrid.jsx';
import TextWidget from '../../../components/TextWidget.jsx';

const addParticipant = (name) => {
  console.log('addParticipant from index');
  return { type: 'ADD_PARTICIPANT', name };
};

export const ParticipantCollectionIndexPage = (props) => (
  <WidgetGrid>
    <TextWidget title="foo">
      <h3>{"ici les participant"}</h3>
      <button onClick={() => props.storeActions.addParticipant('toto')}>add</button>
    </TextWidget>
  </WidgetGrid>
);

ParticipantCollectionIndexPage.propTypes = {
  children: PropTypes.node,
  storeActions: PropTypes.object,
};

export default connect(
  (state) => ({
    storeStates: {
      page: state.resources.participants.collection.index,
      resource: state.resources.participants,
      app: state,
    },
  }),
  (dispatch) => ({ storeActions: bindActionCreators({ addParticipant }, dispatch) }),
)(ParticipantCollectionIndexPage);
