// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';

import Outlet from '../components/Outlet.jsx';
import TextWidget from '../components/TextWidget.jsx';

export const AboutTeamPage = (props) => (
  <TextWidget title="the team" />
);

export default AboutTeamPage;
