import React, { PropTypes } from 'react';

import { routePropTypes } from '../../core/utils/prop-types';

const WidgetGrid = ({ className, children, ...other }) => (
  <div className={`ui ${className || ''} grid`} {...other}>
    {children}
  </div>
);

WidgetGrid.propTypes = {
  ...routePropTypes,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default WidgetGrid;
