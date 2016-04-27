// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/app';

import WidgetGrid from '../../components/WidgetGrid.jsx';
import Outlet from '../../components/Outlet.jsx';
import MenuWidget from '../../components/MenuWidget.jsx';

export const Resource = (props) => (
  <WidgetGrid>
    <MenuWidget
      title="Scores"
      color="red"
      items={[
        { label: 'Hall of fame', route: '/scores', icon: 'game' },
        { label: 'Stats', route: '/scores/stats', icon: 'chart line' },
      ]} />
    <Outlet>
      {props.children}
    </Outlet>
  </WidgetGrid>
);

Resource.propTypes = {
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
)(Resource);
