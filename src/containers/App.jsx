// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';

import WidgetGrid from '../components/WidgetGrid.jsx';
import ApplicationNavbarWidget from '../components/ApplicationNavbarWidget.jsx';
import ApplicationMenuWidget from '../components/ApplicationMenuWidget.jsx';
import MobileApplicationMenuWidget from '../components/MobileApplicationMenuWidget.jsx';
import Outlet from '../components/Outlet.jsx';

export const App = (props) => {
  const items = [
    { label: 'Index', route: '/' },
    { label: 'About', route: '/about', icon: 'info cirle', items: [
      { label: 'The product', route: '/about/product', icon: 'settings' },
      { label: 'The team', route: '/about/team', icon: 'heart' },
    ] },
    { label: 'Contact', route: '/contact', icon: 'user' },
  ];

  const currentLocationPath = props.location.pathname;

  return (
    <WidgetGrid>
      <ApplicationNavbarWidget appName="The Project" color="teal" />
      <ApplicationMenuWidget
        layout={{ mobile: 0, tablet: 0, computer: 3 }}
        currentPath={currentLocationPath}
        color="teal"
        items={items}
        />
      <Outlet layout={{ mobile: 16, tablet: 16, computer: 13 }}>
        {props.children}
      </Outlet>
      <MobileApplicationMenuWidget
        layout={{ mobile: 16, tablet: 16, computer: 0 }}
        color="teal"
        items={items} />
    </WidgetGrid>
  );
};

App.propTypes = {
  location: PropTypes.object,
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
)(App);
