import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';
import IconUI from './IconUI.jsx';


const HeaderUI = (props) => {
  const className = props.className || '';
  const color = props.color || '';

  const subTitle = props.subtitle && <div className="sub header">{props.subtitle}</div>;

  return (
    <div className={`ui ${className} header ${color}`}>
      <IconUI name={props.icon} />
      <div className="content">
        {props.title}
        {subTitle}
      </div>
    </div>
  );
};

HeaderUI.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  layout: PropTypes.object,
};

export default HeaderUI;
