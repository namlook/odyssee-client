import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Widget from '../Widget';
import ConfirmButtonUI from '../ui/ConfirmButtonUI';

class ApplicationNavbarWidget extends React.Component {

  constructor(props) {
    super(props);
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(name, store) {
    const storeName = `${store}Actions`;
    this.props[storeName][name]();
  }

  render() {
    const { items = [], secondaryItems = [], title, ...other } = this.props;


    const itemLinks = items.map((item, i) => (
      <Link key={i} to={item.route} className="item">
        {item.icon ? <i className={`ui ${item.icon} icon`}></i> : null}
        {item.label}
      </Link>
    ));

    const secondaryItemsLinks = secondaryItems.length ? (
      <div className="right menu">
        {secondaryItems.map((item, i) => {
          if (item.route) {
            return (
              <Link key={i} to={item.route} className="item">
                {item.icon ? <i className={`ui ${item.icon} icon`}></i> : null}
                {item.label}
              </Link>
            );
          } else if (item.confirm) {
            return (
              <ConfirmButtonUI
                className="item"
                color={item.color}
                displayLabel={item.confirm.displayLabel}
                confirmLabel={item.confirm.confirmLabel}
                displayIcon={item.confirm.displayIcon}
                confirmIcon={item.confirm.confirmIcon}
                key={i}
                onConfirm={() => this.triggerAction(item.action, item.store)}
              >
                {item.icon ? <i className={`ui ${item.icon} icon`}></i> : null}
                {item.label}
              </ConfirmButtonUI>
            );
          }
          return (
            <a key={i} className="item" onClick={() => this.triggerAction(item.action, item.store)}>
              {item.icon ? <i className={`ui ${item.icon} icon`}></i> : null}
              {item.label}
            </a>
          );
        })}
      </div>
    ) : null;

    return (
      <Widget _name="application-navbar" style={{ paddingBottom: 0 }} {...other}>
        <div
          style={{ borderRadius: 0 }}
          className={`ui large inverted ${this.props.color || ''} top  menu`}
        >
          <Link to="/" className="header item"> {title} </Link>
          {itemLinks}
          {secondaryItemsLinks}
        </div>
      </Widget>
    );
  }
}

ApplicationNavbarWidget.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
  secondaryItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    action: PropTypes.string,
    store: PropTypes.string,
    icon: PropTypes.string,
  })),
};

export default ApplicationNavbarWidget;
