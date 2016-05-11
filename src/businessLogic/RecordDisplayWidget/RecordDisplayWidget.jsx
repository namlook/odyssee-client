import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

import { routePropTypes } from '../../core/utils/prop-types';
import { findRecordFromStore } from '../../core/utils';


class RecordDisplayWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const { params, collectionStore, routeParamsMapping, ownActions } = this.props;
    const requestedRecord = findRecordFromStore(collectionStore, routeParamsMapping, params);
    if (requestedRecord) {
      ownActions.update(requestedRecord);
    } else {
      ownActions.clear();
    }
  }

  render() {
    const {
      ownStore,
      fields,
      ...other,
    } = this.props;

    const recordState = ownStore;

    return (
      <CardWidget
        _name="new-record"
        {...other}
      >
        {fields.map((field) => (
          <div key={field.name} className="ui segment">
            <h3>{field.label}</h3>
            {recordState[field.name]}
          </div>
        ))}
      </CardWidget>
    );
  }
}

RecordDisplayWidget.propTypes = {
  ...routePropTypes,
  recordStore: PropTypes.object,
  fields: PropTypes.array.isRequired,
};

export default RecordDisplayWidget;
