// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';

import WidgetGrid from '../components/WidgetGrid.jsx';
import Outlet from '../components/Outlet.jsx';
import MenuWidget from '../components/MenuWidget.jsx';

export const AboutPage = (props) => (
  <WidgetGrid>
    <MenuWidget
      title="about"
      color="red"
      items={[
        { label: 'the product', route: '/about/product', icon: 'settings ' },
        { label: 'the team', route: '/about/team', icon: 'heart ' },
      ]} />
    <Outlet>
      {props.children}
    </Outlet>
  </WidgetGrid>
);

AboutPage.propTypes = {
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
)(AboutPage);
