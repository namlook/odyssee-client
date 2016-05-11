import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../core/components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const {
    ownStore,
    properties,
    unstackable,
    onClickRedirectTo } = props;
  const records = ownStore.get('content');

  const displayRecord = (record) => (
    properties.map((property) => <td key={property}>{record[property]}</td>)
  );

  const recordClicked = (record) => {
    // displayActions.update(record);
    if (onClickRedirectTo) {
      browserHistory.push(onClickRedirectTo.replace(':id', record._id));
    }
  };

  const table = records.count() ? (
    <table
      style={{ border: 0 }}
      className={`ui ${unstackable && 'unstackable' || ''} striped table`}
    >
      <thead>
        <tr> {properties.map((propname) => <th key={propname}> {propname} </th>)} </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr
            key={record._id}
            onClick={() => recordClicked(record)}
          >
            {displayRecord(record)}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="ui center aligned segment"> {"no records found"} </div>
  );

  return (
    <CardWidget _name="collection-list" {...props}>
      {table}
    </CardWidget>
  );
};

CollectionListWidget.propTypes = {
  ownStore: PropTypes.object,
  color: PropTypes.string,
  unstackable: PropTypes.bool,
  properties: PropTypes.array.isRequired,
  onClickRedirectTo: PropTypes.string,
};

export default CollectionListWidget;
