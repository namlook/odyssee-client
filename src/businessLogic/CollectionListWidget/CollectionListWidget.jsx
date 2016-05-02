import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const { storeState, link } = props;
  const records = storeState[link.collection.from].get(link.collection.to);

  return (
    <CardWidget
      _name="collection-list"
      {...props}
    >
      <div className="ui segment">
        <ul>
          {records.map(({ _id, name }) => (
            <li key={_id}>{name}</li>
          ))}
        </ul>
      </div>
    </CardWidget>
  );
};

CollectionListWidget.propTypes = {
  name: PropTypes.string.isRequired,
  storeState: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default CollectionListWidget;
