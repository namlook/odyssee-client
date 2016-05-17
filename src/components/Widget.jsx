import React, { PropTypes } from 'react';
import _ from 'lodash';

import { routePropTypes } from '../utils/prop-types';

import { number2semanticClassName } from '../utils/semantic-ui';

const layout2semanticClassNames = ({ mobile, tablet, computer }) => {
  let mobileColumn;
  if (mobile === 0) {
    mobileColumn = '';
  } else {
    const mobileOnly = (tablet === 0 || computer === 0) ? 'only' : '';
    mobileColumn = `${number2semanticClassName(mobile)} wide mobile ${mobileOnly}`;
  }

  let tabletColumn;
  if (tablet === 0) {
    tabletColumn = '';
  } else {
    const tabletOnly = (mobile === 0 || computer === 0) ? 'only' : '';
    tabletColumn = _.isNil(tablet)
      ? `${number2semanticClassName(mobile)} wide tablet ${tabletOnly}`
      : `${number2semanticClassName(tablet)} wide tablet ${tabletOnly}`;
  }

  let computerColumn;
  if (computer === 0) {
    computerColumn = '';
  } else {
    const computerOnly = (mobile === 0 || tablet === 0) ? 'only' : '';
    computerColumn = _.isNil(computer)
      ? `${number2semanticClassName(tablet)} wide computer ${computerOnly}`
      : `${number2semanticClassName(computer)} wide computer ${computerOnly}`;
  }

  return `${mobileColumn} ${tabletColumn} ${computerColumn} column`;
};

const Widget = (props) => {
  const { layout, overwriteClassName, className, _name, style, children, ...other } = props;
  const _layout = layout || { mobile: 16 };
  const _className = overwriteClassName
    ? className
    : `${layout2semanticClassNames(_layout)} ${className || ''}`;
  const componentClassName = `${_className} ${_name}-ods-widget`;

  return (
    <div style={style} className={componentClassName} {...other}>
      {children}
    </div>
  );
};

Widget.propTypes = {
  ...routePropTypes,
  className: React.PropTypes.string,
  _name: React.PropTypes.string,
  overwriteClassName: React.PropTypes.bool,
  layout: PropTypes.object,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Widget;
