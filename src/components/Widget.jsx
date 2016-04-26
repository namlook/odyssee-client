import React, { PropTypes } from 'react';
import _ from 'lodash';

const number2string = {
  1: 'un',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
};

const layout2semanticClassNames = ({ mobile, tablet, computer }) => {
  const mobileColumn = mobile === 0 ? 'tablet only' : `${number2string[mobile]} wide mobile`;
  const tabletColumn = _.isNil(tablet)
    ? `${number2string[mobile]} wide tablet`
    : `${number2string[tablet]} wide tablet`;
  const computerColumn = _.isNil(computer)
    ? `${number2string[tablet]} wide computer`
    : `${number2string[computer]} wide computer`;

  return `${mobileColumn} ${tabletColumn} ${computerColumn} column`;
};

const Placeholder = (props) => {
  const layout = props.layout || { mobile: 16 };
  const _className = props.overwriteClassName
    ? props.className
    : `${layout2semanticClassNames(layout)} ${props.className || ''}`;
  const className = `${_className} ${props._name}-ods-widget`;
  return (
    <div style={props.style} className={className}>
      {props.children}
    </div>
  );
};

Placeholder.propTypes = {
  // color: React.PropTypes.string,
  className: React.PropTypes.string,
  _name: React.PropTypes.string,
  overwriteClassName: React.PropTypes.bool,
  // title: React.PropTypes.string,
  layout: PropTypes.object,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Placeholder;
