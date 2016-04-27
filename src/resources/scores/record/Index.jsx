// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/app';

import WidgetGrid from '../../../components/WidgetGrid.jsx';
import TextWidget from '../../../components/TextWidget.jsx';

export const ScoreCollectionIndex = (props) => (
  <WidgetGrid>
    <TextWidget title="foo">
      <h3>"hello world"</h3>
    </TextWidget>
  </WidgetGrid>
);

ScoreCollectionIndex.propTypes = {
  children: PropTypes.node,
};

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
)(ScoreCollectionIndex);
