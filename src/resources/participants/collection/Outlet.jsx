// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/app';

import WidgetGrid from '../../../components/WidgetGrid.jsx';
import Outlet from '../../../components/Outlet.jsx';
import MenuWidget from '../../../components/MenuWidget.jsx';
import TextWidget from '../../../components/TextWidget.jsx';

const addParticipant = (name) => {
  console.log('addParticipant from outlet');
  return { type: 'ADD_PARTICIPANT', name };
};


export const ParticipantCollectionOutletPage = (props) => (
  <WidgetGrid>
    <MenuWidget
      title="Participants"
      color="red"
    />
    <TextWidget title={`${props.storeStates.page.records.length} participants`}> yes !</TextWidget>
    <Outlet>
      {props.children}
    </Outlet>
  </WidgetGrid>
);

ParticipantCollectionOutletPage.propTypes = {
  storeStates: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default connect(
  (state) => ({
    storeStates: {
      page: state.resources.participants.collection.outlet,
      resource: state.resources.participants,
      app: state,
    },
  }),
  (dispatch) => ({ actions: bindActionCreators({ addParticipant }, dispatch) }),
)(ParticipantCollectionOutletPage);

/*
function mapStateToProps(state) {
  console.log('>>', state);
  return {
    state: state.collection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCollection);
*/
