import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../core/components/CardWidget.jsx';
import FormField from '../../core/components/contrib/FormField.jsx';

import { routePropTypes } from '../../core/utils/prop-types';
import { findRecordFromStore } from '../../core/utils';

class RecordFormWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const { params, collectionStore, routeParamsMapping, ownActions } = this.props;
    const requestedRecord = findRecordFromStore(collectionStore, routeParamsMapping, params);
    if (requestedRecord) {
      ownActions.update(requestedRecord);
    } else if (routeParamsMapping) {
      ownActions.clear();
    }
  }

  render() {
    const {
      collectionActions,
      ownStore,
      ownActions,
      fields,
      onSaveRedirectTo,
      onCancelRedirectTo,
      displaySubmitButtons,
      ...other } = this.props;

    const recordState = ownStore;

    const onChange = ownActions.updateProperty;
    const clearRecord = () => ownActions.update({ _id: recordState._id });

    const triggerClear = (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearRecord();
    };

    const triggerSave = (e) => {
      e.preventDefault();
      collectionActions.addRecord(recordState);
      ownActions.clear();
      if (onSaveRedirectTo) {
        let redirectUrl = onSaveRedirectTo;
        if (recordState._id) {
          redirectUrl = onSaveRedirectTo.replace(':id', recordState._id);
        }
        browserHistory.push(redirectUrl);
      }
    };

    const triggerCancel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      ownActions.clear();
      const cancelRedirect = onCancelRedirectTo || onSaveRedirectTo;
      if (cancelRedirect) {
        let redirectUrl = cancelRedirect;
        if (recordState._id) {
          redirectUrl = cancelRedirect.replace(':id', recordState._id);
        }
        browserHistory.push(redirectUrl);
      }
    };

    let submitButtons;
    if (displaySubmitButtons) {
      submitButtons = (
        <div>
          <button type="submit" className="ui right floated primary button">
            save
          </button>
          <button name="cancel" className="ui basic red button" onClick={triggerCancel}>
            cancel
          </button>
          <button name="clear" className="ui basic button" onClick={triggerClear}>
            clear
          </button>
        </div>
      );
    }

    return (
      <CardWidget
        _name="new-record"
        {...other}
      >
        <form className="ui form segment" onSubmit={triggerSave}>
          <div className="three fields">
            {fields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={recordState[field.name]}
                onChange={onChange} />
            ))}
          </div>
          {submitButtons}
        </form>
      </CardWidget>
    );
  }
}

RecordFormWidget.propTypes = {
  ...routePropTypes,
  onSaveRedirectTo: PropTypes.string,
  formStore: PropTypes.object,
  formActions: PropTypes.object,
  collectionActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default RecordFormWidget;
