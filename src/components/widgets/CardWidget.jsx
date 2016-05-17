import React, { PropTypes } from 'react';

import Widget from '../Widget';
import HeaderUI from '../ui/HeaderUI';

import { routePropTypes } from '../../utils/prop-types';

const CardWidget = (props) => {
  const { title, icon, subtitle, color, ...other } = props;

  const borderStyle = title ? { border: 0 } : {};
  const header = !title ? null : (
    <HeaderUI
      title={title}
      icon={icon}
      subtitle={subtitle}
      color={color}
      className="block top attached" />
  );

  const wrapBody = (body) => (
    !title ? body : (
      <div style={{ padding: 0 }} className="ui attached basic segment">
        {body}
      </div>
    )
  );

  const body = (
    <div style={borderStyle} className="ui segments">
      {props.children}
    </div>
  );

  return (
    <Widget {...other}>
      {header}
      {wrapBody(body)}
    </Widget>
  );
};

CardWidget.propTypes = {
  ...routePropTypes,

  layout: PropTypes.object,
  _name: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default CardWidget;
