// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/app';

import WidgetGrid from '../../../components/WidgetGrid.jsx';
import TextWidget from '../../../components/TextWidget.jsx';

export const ScoreCollectionIndexPage = (props) => (
  <WidgetGrid>
    <TextWidget title="foo">
      <h3>"hello world"</h3>
    </TextWidget>
    <TextWidget title="Arf">
      <h3>"hello me"</h3>
    </TextWidget>
  </WidgetGrid>
);

ScoreCollectionIndexPage.propTypes = {
  children: PropTypes.node,
};

export default connect(
  (state) => ({
    storeStates: {
      page: state.resources.scores.collection.index,
      resource: state.resources.scores,
      app: state,
    },
  }),
  (dispatch) => ({ storeActions: bindActionCreators({}, dispatch) }),
)(ScoreCollectionIndexPage);
