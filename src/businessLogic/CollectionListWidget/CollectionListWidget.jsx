import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const { storeState, link, properties } = props;
  const records = storeState[link.collection.from].get(link.collection.to);

  const displayRecord = (record) => (
    properties.map((property) => <p key={property}>{record[property]}</p>)
  );

  return (
    <CardWidget
      _name="collection-list"
      {...props}
    >
      <div className="ui segment">
        <ul>
          {records.map((record) => (
            <li key={record._id}> {displayRecord(record)} </li>
          ))}
        </ul>
      </div>
    </CardWidget>
  );
};

CollectionListWidget.propTypes = {
  name: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
  storeState: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default CollectionListWidget;
