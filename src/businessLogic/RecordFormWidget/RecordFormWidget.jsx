import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../core/components/CardWidget.jsx';
import FormField from '../../core/components/contrib/FormField.jsx';

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

class RecordFormWidget extends React.Component {

  componentWillMount() {
    this.initStore();
  }

  initStore() {
    const { params, collectionStore, routeParamsMapping, formActions, ownActions } = this.props;
    const requestedRecord = findRecordFrom(collectionStore, routeParamsMapping, params);
    const actions = (formActions || ownActions);
    if (requestedRecord) {
      actions.update(requestedRecord);
    } else {
      actions.clear();
    }
  }

  render() {
    const {
      formStore,
      formActions,
      collectionActions,
      ownStore,
      fields,
      onSaveRedirectTo,
      onCancelRedirectTo,
      displaySubmitButtons,
      ...other } = this.props;

    const record = formStore || ownStore;
    const ownActions = formActions || this.props.ownActions;

    const onChange = ownActions.updateProperty;
    const clearRecord = () => ownActions.update({ _id: record._id });

    const triggerClear = (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearRecord();
    };

    const triggerSave = (e) => {
      e.preventDefault();
      collectionActions.addRecord(record);
      ownActions.clear();
      if (onSaveRedirectTo) {
        let redirectUrl = onSaveRedirectTo;
        if (record._id) {
          redirectUrl = onSaveRedirectTo.replace(':id', record._id);
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
        if (record._id) {
          redirectUrl = cancelRedirect.replace(':id', record._id);
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
                value={record[field.name]}
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
  ...ownPropTypes('formStore'),
  onSaveRedirectTo: PropTypes.string,
  formStore: PropTypes.object,
  formActions: PropTypes.object,
  collectionActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default RecordFormWidget;
