import React, { PropTypes } from 'react';


const Widgets = (props) => {
  const className = `${props.className || ''} ui grid`;

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
