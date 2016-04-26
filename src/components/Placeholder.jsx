import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';

const Placeholder = (props) => (
  <Widget
    _name="placeholder"
    style={{ backgroundColor: props.color }}
    layout={props.layout}
    className={props.className}
  >
    <h2>{props.title}</h2>
  </Widget>
);

Placeholder.propTypes = {
  layout: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default Placeholder;
