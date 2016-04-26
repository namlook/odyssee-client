import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';

const IconUI = (props) => {
  if (!props.name) return null;
  const iconClassName = `${props.name} ${props.size} icon`;
  return <i className={iconClassName}></i>;
};

IconUI.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
};

export default IconUI;
