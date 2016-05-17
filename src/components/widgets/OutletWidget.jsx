import React, { PropTypes } from 'react';

import Widget from '../Widget';
import { routePropTypes } from '../../utils/prop-types';

const OutletWidget = ({ children, ...other }) => (
  <Widget _name="outlet" {...other}>
    {children}
  </Widget>
);

OutletWidget.propTypes = {
  ...routePropTypes,
  children: PropTypes.node,
};

export default OutletWidget;
