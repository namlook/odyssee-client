// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app';

import WidgetGrid from '../../components/WidgetGrid.jsx';
import MenuWidget from '../../components/MenuWidget.jsx';
import TextWidget from '../../components/TextWidget.jsx';

export const App = (props) => (
  <WidgetGrid>
    <MenuWidget title="contact" />
    <TextWidget title="how to contact us" icon="map">
      <h4>{"you'll find the map here"}</h4>
    </TextWidget>
  </WidgetGrid>
);


function mapStateToProps(state) {
  return {
    appState: state.app,
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
)(App);
