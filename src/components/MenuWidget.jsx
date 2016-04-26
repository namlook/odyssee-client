import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Widget from './Widget.jsx';

import jQuery from 'jquery';
import semanticTransition from 'semantic-ui-transition';
import semanticPopup from 'semantic-ui-popup';
import semanticDropDown from 'semantic-ui-dropdown';

window.$ = jQuery;
window.$.fn.transition = semanticTransition;
window.$.fn.popup = semanticPopup;
window.$.fn.dropdown = semanticDropDown;

/* eslint-disable react/no-set-state */

export class MenuWidget extends React.Component {

  componentDidMount() {
    $(this.refs.popupActivator).popup({
      popup: $(this.refs.popup),
      hoverable: true,
      position: 'bottom right',
      delay: {
        show: 300,
        hide: 800,
      },
    });

    $(this.refs.dropdown).dropdown();
  }

  render() {
    const { layout, className, color, items, title } = this.props;

    const itemLinks = (items || []).map((item) => (
      <Link to={item.route} key={item.route} activeClassName="active" className="item">
        <i className={`${item.icon} icon`}></i>
        {item.label}
      </Link>
    ));


    return (
      <Widget
        _name="menu"
        layout={layout}
        className={className}
      >

        <div className="ui one column grid">
          <div className="ui computer only column">
            <div className={`ui icon ${color} secondary pointing menu`}>
              <a className="header item">
                {title}
                <i className="feed icon"></i>
              </a>
              {itemLinks}

              <div className="right menu">
                <div className="ui right aligned search item">
                  <div className="ui transparent icon input">
                    <input className="prompt" type="text" placeholder="search..." />
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>

              </div>
            </div>

          </div>


          <div className="ui mobile only tablet only column">
            <div className="ui popup" ref="popup">
              <div className={`ui vertical ${color} menu`}>
                <div className="ui search item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..." />
                    <i className="search link icon"></i>
                  </div>
                </div>
                {itemLinks}
              </div>
            </div>
            <div className="ui icon secondary pointing menu">
              <a className="header item">
                {title}
                <i className="feed icon"></i>
              </a>
              <div className="right menu">
                <a className="browse item" ref="popupActivator">
                  <i className="sidebar icon"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Widget>
    );
  }
}

MenuWidget.propTypes = {
  layout: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
};

export default MenuWidget;
