import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const { storeState, storeActions, recordsStore } = props;
  const { records } = storeState[recordsStore];
  return (
    <CardWidget
      _name="collection-list"
      {...props}
    >
      <div className="ui segment">
        <ul>
          {records.map((recordName) => (
            <li key={recordName}>{recordName}</li>
          ))}
        </ul>
      </div>
    </CardWidget>
  );
};

CollectionListWidget.propTypes = {
  name: PropTypes.string.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  recordsStore: PropTypes.string.isRequired,
};

export default CollectionListWidget;
