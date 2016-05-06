import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const CollectionListWidget = (props) => {
  const { storeState, link, name, properties, unstackable } = props;
  const records = storeState[link.collection || name].get('content');

  const displayRecord = (record) => (
    properties.map((property) => <td key={property}>{record[property]}</td>)
  );

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
          <tr key={record._id}> {displayRecord(record)} </tr>
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
  name: PropTypes.string,
  color: PropTypes.string,
  unstackable: PropTypes.bool,
  properties: PropTypes.array.isRequired,
  storeState: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default CollectionListWidget;
