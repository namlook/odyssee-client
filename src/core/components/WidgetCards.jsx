import React, { PropTypes } from 'react';

// NOT USED TO BE DELETED

const Widgets = (props) => {
  const className = `${props.className || 'ui  cards'}`;

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

Widgets.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Widgets;
