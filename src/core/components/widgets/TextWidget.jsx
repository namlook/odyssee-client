import React, { PropTypes } from 'react';

import CardWidget from '../CardWidget.jsx';

const TextWidget = (props) => {
  const className = `${props.className || ''}`;

  return (
    <CardWidget
      _name="text"
      className={className}
      {...props}
    >
      <div className="ui segment">
        {props.children}
      </div>
    </CardWidget>
  );
};

TextWidget.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TextWidget;
