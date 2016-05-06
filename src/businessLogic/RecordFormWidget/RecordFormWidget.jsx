import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';
import FormField from '../../core/components/contrib/FormField.jsx';

const RecordFormWidget = (props) => {
  const {
    formStore,
    formActions,
    ownActions,
    collectionActions,
    ownStore,
    fields,
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

  const triggerSave = (e) => {
    e.preventDefault();
    onSave(record);
    onClear();
  };

  let submitButtons;
  if (displaySubmitButtons) {
    submitButtons = (
      <div>
        <input value="save" type="submit" className="ui primary button" onClick={triggerSave} />
        <button className="ui basic red button" onClick={() => onClear()}>
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
  name: PropTypes.string,
  on: PropTypes.object,
  // linkedStores: PropTypes.object.isRequired,
  // storeState: PropTypes.object.isRequired,
  // storeActions: PropTypes.object.isRequired,
  ownStore: PropTypes.object,
  formStore: PropTypes.object,
  ownActions: PropTypes.object,
  formActions: PropTypes.object,
  collectionActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default RecordFormWidget;
