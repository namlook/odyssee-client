import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { routePropTypes } from '../../utils/prop-types';

import Widget from '../Widget';

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
        show: 200,
        hide: 800,
      },
    });

    $(this.refs.dropdown).dropdown();
  }

  generateMenuLink(params) {
    return (item) => {
      const route = Object.keys(params).reduce(
        (acc, paramName) => acc.replace(`:${paramName}`, params[paramName]),
      item.route);
      return (
        <Link
          to={route}
          key={item.route}
          onlyActiveOnIndex={!item.index}
          activeClassName="active"
          className="item"
        >
          <i className={`${item.icon} icon`}></i>
          {item.label}
        </Link>
      );
    };
  }

  render() {
    const { layout, className, color, items, params, title, icon, secondaryItems } = this.props;

    const menuLink = this.generateMenuLink(params);
    const itemLinks = (items || []).map(menuLink);
    const secondaryItemLinks = (secondaryItems || []).map(menuLink);

    // TODO for the following, the menu needs its own store
    // const querySearch = _.get(location, 'query.search');
    // const triggerSearch = (e) => {
    //   e.preventDefault();
    //   location.query.search = this.refs.search.value;
    //   browserHistory.replace(location);
    // };

    return (
      <Widget
        _name="menu"
        layout={layout}
        className={className}
      >

        <div className="ui one column grid">
          <div className="ui tablet only computer only column">
            <div className={`ui ${color} secondary pointing menu`}>

              <a className="header item">
                <span style={{ marginRight: '0.5rem' }}> {title} </span>
                {icon ? (<i className={`${icon} icon`}></i>) : null}
              </a>
              {itemLinks}

              <div className="right menu">
                {/* TODO for the followin, the widget need its own store
                <div className="ui right aligned search item">
                  <div className="ui transparent icon input">
                    <input className="prompt" type="text" placeholder="search..." />
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
                */}

                {secondaryItemLinks.length ? (
                  <div className="ui dropdown link item" ref="dropdown">
                    <span className="text"><i className="sidebar icon"></i></span>
                    <div className="menu">
                      {secondaryItemLinks}
                    </div>
                  </div>
                ) : null}
              </div>

            </div>
          </div>


          <div className="ui mobile only column">
            <div className="ui popup" ref="popup">
              <div className={`ui vertical ${color} menu`}>
                <div className="ui search item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..." />
                    <i className="search link icon"></i>
                  </div>
                </div>
                {itemLinks}
                {secondaryItemLinks}
              </div>
            </div>

            <div className="ui secondary pointing menu">
              <a className="header item">
                {title}
                <i className={`${icon} icon`}></i>
              </a>
              <div className="right menu">
                <a className="item" ref="popupActivator">
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
  ...routePropTypes,
  layout: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
  secondaryItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
};

export default MenuWidget;
