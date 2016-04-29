import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const NewRecordWidget = (props) => {
  const { storeState, storeActions, name } = props;
  const ownState = storeState[name];
  const ownActions = storeActions[name];

  const onSave = () => {
    props.onSave(ownState.value);
    ownActions.clearForm();
  };

  return (
    <CardWidget
      _name="new-record"
      {...props}
    >
      <div className="ui segment">

        <input
          type="text"
          value={ownState.value}
          onChange={(e) => ownActions.changeValue(e.target.value)} />

        <button onClick={onSave}>
          save
        </button>
        <button onClick={() => ownActions.clearForm()}>
          clear
        </button>
      </div>
    </CardWidget>
  );
};

NewRecordWidget.propTypes = {
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default NewRecordWidget;
