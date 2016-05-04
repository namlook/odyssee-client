import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';


const FormSubmitWidget = (props) => {
  const { storeState, storeActions, on, link } = props;
  const record = storeState[link.record];

  const onSave = storeActions[on.save.on][on.save.dispatch];
  const onClear = storeActions[on.clear.on][on.clear.dispatch];

  const triggerSave = () => {
    onSave(record);
    onClear();
  };

  return (
    <CardWidget
      _name="new-record"
      {...props}
    >
      <div className="ui form segment">
        <button className="ui primary button" onClick={triggerSave}>
          save
        </button>
        <button className="ui basic red button" onClick={() => onClear()}>
          clear
        </button>
      </div>
    </CardWidget>
  );
};

FormSubmitWidget.propTypes = {
  on: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default FormSubmitWidget;
