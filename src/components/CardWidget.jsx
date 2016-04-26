import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';
import HeaderUI from './HeaderUI.jsx';

const Placeholder = (props) => {
  const className = `${props.className || ''}`;

  const paddingStyle = props.title ? { padding: 0 } : {};
  const borderStyle = props.title ? { border: 0 } : {};

  return (
    <Widget
      _name={props._name}
      style={props.style}
      layout={props.layout}
      className={className}
    >
      <HeaderUI
        title={props.title}
        icon={props.icon}
        subtitle={props.subtitle}
        className="block top attached" />

      <div style={paddingStyle} className="ui attached segment">
        <div style={borderStyle} className="ui segments">
          {props.children}
        </div>
      </div>
    </Widget>
  );
};

Placeholder.propTypes = {
  layout: PropTypes.object,
  _name: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Placeholder;
