import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../components/widgets/CardWidget';
import FormField from '../../components/contrib/FormField';

import { findRecordFromStore } from '../../utils';

const storeToQuery = (exposeStateToRouteQuery, store) => (
  Object.keys(exposeStateToRouteQuery).reduce((acc, propertyName) => {
    const value = store.get(propertyName);
    if (value) {
      return { ...acc, [exposeStateToRouteQuery[propertyName]]: value };
    }
    return acc;
  }, {})
);

class RecordFormWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const {
      params,
      collectionStore,
      linkedRouteParams,
      location,
      exposeStateToRouteQuery,
      ownActions,
    } = this.props;

    if (collectionStore && linkedRouteParams) { // fill form from url params
      const requestedRecord = findRecordFromStore(collectionStore, linkedRouteParams, params);
      if (requestedRecord) {
        ownActions.update(requestedRecord);
      } else if (linkedRouteParams) {
        ownActions.clear();
      }
    } else if (exposeStateToRouteQuery) { // fill form from url query
      Object.keys(exposeStateToRouteQuery).forEach((storePropertyName) => {
        const queryFilterName = exposeStateToRouteQuery[storePropertyName];
        ownActions.updateProperty(storePropertyName, location.query[queryFilterName]);
      });
    }
  }

  render() {
    const {
      collectionActions,
      ownStore,
      ownActions,
      fields,
      location,
      onSaveRedirectTo,
      onCancelRedirectTo,
      displaySubmitButtons,
      exposeStateToRouteQuery,
      ...other } = this.props;

    const recordState = ownStore;

    const clearRecord = () => ownActions.update({ _id: recordState._id });

    const triggerClear = (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearRecord();
    };

    const triggerSave = (e) => {
      e.preventDefault();
      if (collectionActions) {
        collectionActions.addRecord(recordState);
      }
      if (exposeStateToRouteQuery) {
        location.query = storeToQuery(exposeStateToRouteQuery, recordState);
        browserHistory.replace(location);
      }
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

    const triggerChange = (...args) => {
      ownActions.updateProperty(...args);
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
                onChange={triggerChange} />
            ))}
          </div>
          {submitButtons}
        </form>
      </CardWidget>
    );
  }
}

RecordFormWidget.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  exposeStateToRouteQuery: PropTypes.object,
  linkedRouteParams: PropTypes.object,
  onSaveClearForm: PropTypes.bool,
  onSaveRedirectTo: PropTypes.string,
  onCancelRedirectTo: PropTypes.string,
  ownStore: PropTypes.object,
  ownActions: PropTypes.object,
  collectionStore: PropTypes.object,
  collectionActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default RecordFormWidget;
