import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget.jsx';

// XXX

const AddParticipantWidget = (props) => {
  const { storeActions } = props;

  return (
    <CardWidget
      _name="text"
      {...props}
    >
      <div className="ui segment">
        <input type="text" id="new-participants" />
        <button onClick={() => storeActions.addParticipant('toto')}>add</button>
      </div>
    </CardWidget>
  );
};

AddParticipantWidget.propTypes = {
  className: PropTypes.string,
  storeStates: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default AddParticipantWidget;
