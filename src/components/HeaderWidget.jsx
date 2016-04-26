import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';
import IconUI from './IconUI.jsx';


const HeaderWidget = (props) => {
  const widgetClassName = props.className || '';

  const subTitle = props.subtitle ? <div className="sub header">{props.subtitle}</div> : null;

  return (
    <Widget _name="header" className={widgetClassName} layout={props.layout}>
      <div className={`ui dividing header ${props.color}`}>
        <IconUI name={props.icon} />
        <div className="content">
          {props.title}
          {subTitle}
        </div>
      </div>
    </Widget>
  );
};

HeaderWidget.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  layout: PropTypes.object,
};

export default HeaderWidget;
