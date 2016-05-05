import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';
import { routePropTypes } from '../../core/utils/prop-types';

const Outlet = ({ children, ...other }) => (
  <Widget _name="outlet" {...other}>
    {children}
  </Widget>
);

Outlet.propTypes = {
  ...routePropTypes,
  children: PropTypes.node,
};

export default Outlet;
