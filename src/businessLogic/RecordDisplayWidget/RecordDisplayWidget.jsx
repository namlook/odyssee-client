import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

import { ownPropTypes, routePropTypes } from '../../core/utils/prop-types';

import _ from 'lodash';

const fillParams = (routeParamsMapping, params) => (
  Object.keys(routeParamsMapping || {}).reduce((acc, propertyName) => {
    const value = routeParamsMapping[propertyName];
    return { ...acc, [propertyName]: value[0] === ':' ? params[value.slice(1)] : value };
  }, {})
);

const findRecordFrom = (collectionStore, routeParamsMapping, params) => {
  const queryFilter = fillParams(routeParamsMapping, params);
  return !_.isEmpty(queryFilter) && collectionStore.get('content').find(_.matches(queryFilter));
};


class RecordDisplayWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const { params, collectionStore, routeParamsMapping, recordActions, ownActions } = this.props;
    const requestedRecord = findRecordFrom(collectionStore, routeParamsMapping, params);
    const actions = (recordActions || ownActions);
    if (requestedRecord) {
      actions.update(requestedRecord);
    } else {
      actions.clear();
    }
  }

  render() {
    const {
      recordStore,
      ownStore,
      fields,
      ...other,
    } = this.props;

    const record = recordStore || ownStore;

    return (
      <CardWidget
        _name="new-record"
        {...other}
      >
        {fields.map((field) => (
          <div key={field.name} className="ui segment">
            <h3>{field.label}</h3>
            {record[field.name]}
          </div>
        ))}
      </CardWidget>
    );
  }
}

RecordDisplayWidget.propTypes = {
  ...routePropTypes,
  ...ownPropTypes('recordStore'),
  recordStore: PropTypes.object,
  fields: PropTypes.array.isRequired,
};

export default RecordDisplayWidget;
