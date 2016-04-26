import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';

const ApplicationNavbarWidget = (props) => (
  <Widget
    _name="app-navbar"
    layout={props.layout}
    style={{ paddingBottom: 0 }}
    className={props.className}
  >
    <div style={{ borderRadius: 0 }} className={`ui large inverted ${props.color || ''} top  menu`}>
      <a className="header item"> <i className="user icon"></i> {props.appName} </a>
      <a className="item">foo</a>
      <div className="right menu">
        <a className="item">logout</a>
      </div>
    </div>
  </Widget>
);

ApplicationNavbarWidget.propTypes = {
  layout: PropTypes.object,
  className: PropTypes.string,
  appName: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default ApplicationNavbarWidget;
