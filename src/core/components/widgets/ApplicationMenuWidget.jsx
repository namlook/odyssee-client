import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Widget from '../Widget.jsx';
import DropdownUI from '../ui/DropdownUI.jsx';
import _ from 'lodash';

const ApplicationMenuWidget = (props) => {
  const color = props.color || '';
  const widgetClassName = `${props.className || ''} ${color}`;
  const menuClassName = `large fluid inverted ${color}`;
  const mobileMenuClassName = `ui stackable ${menuClassName} menu`;
  const computerMenuClassName = `ui vertical ${menuClassName} menu`;

  const generateMenuLink = (item) => (
    <Link
      to={item.route}
      key={item.label}
      onlyActiveOnIndex={!item.index}
      activeClassName="active"
      className="item"
    >
      <i className={`${item.icon} icon`}></i>
      {item.label}
    </Link>
  );

  const generateComputerMenuLink = (item) => {
    if (item.items) {
      return (
        <div key={item.label} className="item">
          <i className={`${item.icon} icon`}></i>
          {item.label}
          {item.items ? (<div className="menu">{item.items.map(generateMenuLink)}</div>) : null}
        </div>
      );
    }
    return generateMenuLink(item);
  };

  const generateMobileMenuLink = (item) => {
    if (item.items) {
      return item.items.map((subitem) => {
        const newSubitem = { ...subitem, label: `${item.label}: ${subitem.label}` };
        return generateMobileMenuLink(newSubitem);
      });
    }
    return generateMenuLink(item);
  };

  const computerItems = props.items.map(generateComputerMenuLink);
  const mobileItems = props.items.map(generateMobileMenuLink);

  const currentItem = _(props.items)
    .flatMap((item) => {
      if (item.items) {
        return item.items.map((subitem) => ({
          route: subitem.route,
          icon: subitem.icon,
          label: `${item.label}: ${subitem.label}`,
        }));
      }
      return [item];
    })
    .filter((item) => item.route === props.currentPath)
    .map((item) => (
      <span key={item.route}>
        <i className={`${item.icon} icon`}></i>
        {item.label}
      </span>))
    .value();

  return (
    <Widget
      _name="application-menu"
      layout={props.layout}
      className={widgetClassName}
    >
      <div className="ui one column grid">

        <div style={{ paddingTop: 0, paddingBottom: 0 }} className="mobile only column">
          <DropdownUI className="ui teal fluid dropdown button">
            {currentItem}
            <i className="dropdown icon"></i>
            <div className="menu">
              {mobileItems}
            </div>
          </DropdownUI>
        </div>

        <div className="tablet only computer only column">
          <div className={computerMenuClassName}>
            {computerItems}
          </div>
        </div>

      </div>
    </Widget>
  );
};

ApplicationMenuWidget.propTypes = {
  layout: PropTypes.object,
  className: PropTypes.string,
  currentPath: PropTypes.string.isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
};

export default ApplicationMenuWidget;
