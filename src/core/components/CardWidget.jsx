import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';
import HeaderUI from './ui/HeaderUI.jsx';

const CardWidget = (props) => {
  const className = `${props.className || ''}`;

  const borderStyle = props.title ? { border: 0 } : {};

  const header = !props.title ? null : (
    <HeaderUI
      title={props.title}
      icon={props.icon}
      subtitle={props.subtitle}
      className="block top attached" />
  );

  const wrapBody = (body) => (
    !props.title ? body : (
      <div style={{ padding: 0 }} className="ui attached segment">
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
    <Widget
      _name={props._name}
      style={props.style}
      layout={props.layout}
      className={className}
    >
      {header}
      {wrapBody(body)}
    </Widget>
  );
};

CardWidget.propTypes = {
  layout: PropTypes.object,
  _name: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default CardWidget;
