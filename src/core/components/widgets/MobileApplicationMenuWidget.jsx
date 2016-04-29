import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Widget from '../Widget.jsx';
import { number2semanticClassName } from '../../utils/semantic-ui';

const MobileApplicationMenuWidget = (props) => {
  const color = props.color || '';
  const items = props.items || [];

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

  const itemsNumber = number2semanticClassName(items.length);
  const itemLinks = items.map(generateMenuLink);

  return (
    <Widget
      _name="mobile-application-menu"
      layout={props.layout}
      className={props.className}
      style={{ marginBottom: '4rem' }}
    >
      <div className={`ui ${itemsNumber} item bottom fixed labeled icon ${color} inverted menu`}>
        {itemLinks}
      </div>
    </Widget>
  );
};

MobileApplicationMenuWidget.propTypes = {
  layout: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
};

export default MobileApplicationMenuWidget;
