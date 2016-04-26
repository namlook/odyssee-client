// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';

import WidgetGrid from '../components/WidgetGrid.jsx';
import MenuWidget from '../components/MenuWidget.jsx';
import HeaderWidget from '../components/HeaderWidget.jsx';
import CardWidget from '../components/CardWidget.jsx';
import TextWidget from '../components/TextWidget.jsx';

export const AboutProductPage = (props) => (
  <WidgetGrid>
    <TextWidget title="8 users" icon="user" layout={{ mobile: 16, tablet: 8 }}>arf</TextWidget>
    <TextWidget title="the product" layout={{ mobile: 16, tablet: 8 }}>yeah !</TextWidget>
    <HeaderWidget
      title="The product"
      subtitle="you'll love it"
      icon="user"
      color="red"
      layout={{ mobile: 16 }} />
    <TextWidget
      title="the team" icon="heart" subtitle="the best" layout={{ mobile: 16, tablet: 8 }}>
      arf
    </TextWidget>
    <CardWidget title="the product" layout={{ mobile: 16, tablet: 8 }}>
      <div className="ui segment">
        <h4><i className="teal settings icon"></i> hello </h4>
      </div>

      <div className="ui segment">
        <p>
          <a className="ui left ribbon label">Ribbon</a>
          bla bla bla ba
        </p>
      </div>

      <div className="ui horizontal segments">
        <div className="ui segment">
          <p className="right floated">
            <i className="heart outline like icon"></i> 17 likes
          </p>
        </div>
        <div className="ui segment">
          <p className="left floated">
            <i className="comment icon"></i> 3 comments
          </p>
        </div>
      </div>
    </CardWidget>
  </WidgetGrid>

);

export default AboutProductPage;
