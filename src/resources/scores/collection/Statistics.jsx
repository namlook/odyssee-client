// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/app';

import WidgetGrid from '../../../components/WidgetGrid.jsx';
import TextWidget from '../../../components/TextWidget.jsx';
import ScoreStatsWidget from '../../../businessLogic/ScoreStatsWidget.jsx';

export const ScoreCollectionStatisticsPage = (props) => (
  <WidgetGrid>
    <TextWidget title={props.storeStates.page.stats}>
      <h3> {JSON.stringify(props.storeStates.resource.collection.outlet.records)} </h3>
    </TextWidget>

    <ScoreStatsWidget
      title="stats"
      icon="chart line"
      subtitle="yeaah"
      storeStates={props.storeStates}
    />

  </WidgetGrid>
);

ScoreCollectionStatisticsPage.propTypes = {
  storeStates: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default connect(
  (state) => ({
    storeStates: {
      page: state.resources.scores.collection.statistics,
      resource: state.resources.scores,
      app: state,
    },
  }),
  (dispatch) => ({ storeActions: bindActionCreators({}, dispatch) }),
)(ScoreCollectionStatisticsPage);
