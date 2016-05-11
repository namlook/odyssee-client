import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { ownPropTypes } from '../../core/utils/prop-types';

import CardWidget from '../../core/components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const {
    collectionStore,
    ownStore,
    // displayActions,
    properties,
    unstackable,
    onClickRedirectTo } = props;
  const records = (collectionStore || ownStore).get('content');

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
  ...ownPropTypes('collectionStore'),
  color: PropTypes.string,
  unstackable: PropTypes.bool,
  properties: PropTypes.array.isRequired,
  collectionStore: PropTypes.object,
  displayActions: PropTypes.object,
};

export default CollectionListWidget;
