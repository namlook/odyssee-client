import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const NewRecordWidget = (props) => {
  const { storeState, storeActions, name, on, link } = props;
  const ownState = storeState[name];
  const ownActions = storeActions[name];
  const records = storeState[link.collection.from].get(link.collection.to);

  const onSave = () => {
    const _id = ownState.value.split(' ').join('');
    on.save(_id, { name: ownState.value, position: records.count() });
    ownActions.clearForm();
  };

  return (
    <CardWidget
      _name="new-record"
      {...props}
    >
      <div className="ui form segment">
        <div className="fields">
          <div className="input field">
            <input
              type="text"
              value={ownState.value}
              onChange={(e) => ownActions.changeValue(e.target.value)} />
          </div>
          <div className="field">
            <button className="ui primary button" onClick={onSave}>
              save
            </button>
            <button className="ui basic red button" onClick={() => ownActions.clearForm()}>
              clear
            </button>
          </div>
        </div>
      </div>
    </CardWidget>
  );
};

NewRecordWidget.propTypes = {
  name: PropTypes.string.isRequired,
  on: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default NewRecordWidget;
