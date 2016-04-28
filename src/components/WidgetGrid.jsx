import React, { PropTypes } from 'react';


const WidgetGrid = (props) => {
  const className = `${props.className || ''} ui grid`;

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

WidgetGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default WidgetGrid;
