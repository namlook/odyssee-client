import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../components/widgets/CardWidget';

const CollectionListWidget = (props) => {
  const {
    ownStore,
    linkedRouteQuery,
    searchStore,
    searchProperty,
    properties,
    unstackable,
    onClickRedirectTo,
    location,
    ...other } = props;

  const searchValue = linkedRouteQuery && location.query[linkedRouteQuery.search]
    || searchStore && searchStore.get('value');

  const storeContent = ownStore.get('content');

  const records = searchProperty && searchValue
    ? storeContent.filter((o) => o[searchProperty] === searchValue)
    : storeContent;

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
    <CardWidget _name="collection-list" {...other}>
      {table}
    </CardWidget>
  );
};

CollectionListWidget.propTypes = {
  location: PropTypes.object.isRequired,
  linkedRouteQuery: PropTypes.object,
  ownStore: PropTypes.object.isRequired,
  searchStore: PropTypes.object,
  color: PropTypes.string,
  unstackable: PropTypes.bool,
  properties: PropTypes.array.isRequired,
  onClickRedirectTo: PropTypes.string,
  searchProperty: PropTypes.string,
};


// const getSearchFilter = (state, props) => (
//   props.location.query.search ||
//   props.searchStore && props.searchStore.get('value')
// );
//
// const getSearchProperty = (state, props) => props.searchProperty;
//
// const getContent = (state) => state.get('content');
//
// CollectionListWidget.selectors = {
//   content: createSelector(
//     [getSearchFilter, getContent, getSearchProperty],
//     (searchFilter, content, searchProperty) => (
//       searchFilter ? content.filter((o) => o[searchProperty] === searchFilter) : content
//     )
//   ),
// };

export default CollectionListWidget;
