import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';

const Outlet = (props) => (
  <Widget _name="outlet" className={props.className || ''} layout={props.layout}>
    {props.children}
  </Widget>
);

Outlet.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.object,
  children: PropTypes.node,
};

export default Outlet;
