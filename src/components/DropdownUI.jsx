import React, { PropTypes } from 'react';

import Widget from './Widget.jsx';

import jQuery from 'jquery';
import semanticTransition from 'semantic-ui-transition';
import semanticPopup from 'semantic-ui-popup';
import semanticDropDown from 'semantic-ui-dropdown';

window.$ = jQuery;
window.$.fn.transition = semanticTransition;
window.$.fn.dropdown = semanticDropDown;

/* eslint-disable react/no-set-state */

export class DropdownUI extends React.Component {

  componentDidMount() {
    $(this.refs.dropdown).dropdown();
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
  children: PropTypes.node,
};

export default DropdownUI;
