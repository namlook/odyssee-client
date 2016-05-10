import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import CardWidget from '../../core/components/CardWidget.jsx';
import FormField from '../../core/components/contrib/FormField.jsx';

import { ownPropTypes } from '../../core/utils/prop-types';

const RecordFormWidget = (props) => {
  const {
    formStore,
    formActions,
    ownActions,
    collectionActions,
    ownStore,
    fields,
    onSaveRedirectTo,
    onCancelRedirectTo,
    displaySubmitButtons } = props;
  const record = formStore || ownStore;
  const actions = formActions || ownActions;

  // let onChange;
  // let onSave;
  // let onClear;
  // if (on) {
  //   onChange = storeActions[on.change.on][on.change.dispatch];
  //   onSave = storeActions[on.save.on][on.save.dispatch];
  //   onClear = storeActions[on.clear.on][on.clear.dispatch];
  // } else {
  //   onChange = storeActions[linkedStores.form].updateProperty;
  //   onClear = storeActions[linkedStores.form].clear;
  //   onSave = storeActions[linkedStores.saveTo].addRecord;
  // }

  const onChange = actions.updateProperty;
  const onClear = actions.clear;
  const onSave = collectionActions.addRecord;

  const triggerClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClear();
  };

  const triggerSave = (e) => {
    e.preventDefault();
    onSave(record);
    onClear();
    if (onSaveRedirectTo) {
      let redirectUrl = onSaveRedirectTo;
      if (record._id) {
        redirectUrl = onSaveRedirectTo.replace(':id', record._id);
      }
      browserHistory.push(redirectUrl);
    }
  };

  const triggerCancel = (e) => {
    triggerClear(e);
    const cancelRedirect = onCancelRedirectTo || onSaveRedirectTo;
    console.log('cancel', record._id, record, cancelRedirect);
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
      {...props}
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
};

RecordFormWidget.propTypes = {
  ...ownPropTypes('formStore'),
  onSaveRedirectTo: PropTypes.string,
  formStore: PropTypes.object,
  formActions: PropTypes.object,
  collectionActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default RecordFormWidget;
