import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget';

import { findRecordFromStore } from '../../core/utils';


class RecordDisplayWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const { params, collectionStore, linkedRouteParams, ownActions } = this.props;
    const requestedRecord = findRecordFromStore(collectionStore, linkedRouteParams, params);
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
  params: PropTypes.object.isRequired,
  linkedRouteParams: PropTypes.object,
  ownStore: PropTypes.object.isRequired,
  ownActions: PropTypes.object.isRequired,
  collectionStore: PropTypes.object,
  fields: PropTypes.array.isRequired,
};

export default RecordDisplayWidget;
