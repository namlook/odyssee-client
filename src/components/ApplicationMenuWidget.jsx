import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Widget from './Widget.jsx';

const ApplicationMenuWidget = (props) => {
  const color = props.color || '';
  const widgetClassName = `${props.className || ''} ${color}`;
  const menuClassName = `large fluid inverted ${color}`;
  const mobileMenuClassName = `ui stackable ${menuClassName} menu`;
  const computerMenuClassName = `ui vertical ${menuClassName} menu`;

  const generateMenuLink = (item) => {
    if (item.items) {
      return (
        <div key={item.label} className="item">
          <i className={`${item.icon} icon`}></i>
          {item.label}
          {item.items ? (<div className="menu">{item.items.map(generateMenuLink)}</div>) : null}
        </div>
      );
    }
    return (
      <Link to={item.route} key={item.label} activeClassName="active" className="item">
        <i className={`${item.icon} icon`}></i>
        {item.label}
      </Link>
    );
  };

  const generateMobileMenuLink = (item) => {
    if (item.items) {
      return item.items.map((subitem) => {
        const newSubitem = { ...subitem, label: `${item.label}: ${subitem.label}` };
        return generateMobileMenuLink(newSubitem);
      });
    }
    return (
      <Link to={item.route} key={item.label} activeClassName="active" className="item">
        <i className={`${item.icon} icon`}></i>
        {item.label}
      </Link>
    );
  };

  const items = props.items.map(generateMenuLink);
  const mobileItems = props.items.map(generateMobileMenuLink);

  return (
    <Widget
      _name="app-menu"
      layout={props.layout}
      className={widgetClassName}
    >
      <div className="ui one column grid">

        <div style={{ paddingTop: 0, paddingBottom: 0 }} className="mobile only column">
          <div className={mobileMenuClassName}>
            {mobileItems}
          </div>
        </div>

        <div className="tablet only computer only column">
          <div className={computerMenuClassName}>
            {items}
          </div>
        </div>

      </div>
    </Widget>
  );
};

ApplicationMenuWidget.propTypes = {
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

export default ApplicationMenuWidget;
