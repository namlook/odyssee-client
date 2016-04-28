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

export const ScoreCollectionOutletPage = (props) => (
  <WidgetGrid>
    <MenuWidget
      title="Scores"
      color="red"
      items={[
        { label: 'Hall of fame', route: '/scores', icon: 'game' },
        { label: 'Stats', route: '/scores/stats', icon: 'chart line' },
      ]} />
    <TextWidget title={`${props.storeStates.page.records.length} results`}> plop !</TextWidget>
    <Outlet>
      {props.children}
    </Outlet>
  </WidgetGrid>
);

ScoreCollectionOutletPage.propTypes = {
  storeStates: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default connect(
  (state) => ({
    storeStates: {
      page: state.resources.scores.collection.outlet,
      resource: state.resources.scores,
      app: state,
    },
  }),
  (dispatch) => ({ storeActions: bindActionCreators({}, dispatch) }),
)(ScoreCollectionOutletPage);

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
