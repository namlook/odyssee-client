import React, { PropTypes } from 'react';

import jQuery from 'jquery';
import semanticTransition from 'semantic-ui-transition';
import semanticDropDown from 'semantic-ui-dropdown';

window.$ = jQuery;
window.$.fn.transition = semanticTransition;
window.$.fn.dropdown = semanticDropDown;

/* eslint-disable react/no-set-state */

export class DropdownUI extends React.Component {

  componentDidMount() {
    const { onChange } = this.props;
    $(this.refs.dropdown).dropdown({
      onChange,
    });
  }

  render() {
    const { style, className, children } = this.props;
    return (
      <div style={style} className={`ui dropdown ${className || ''}`} ref="dropdown">
        {children}
      </div>
    );
  }
}


DropdownUI.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default DropdownUI;
