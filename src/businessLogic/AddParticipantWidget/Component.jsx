import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget.jsx';

const AddParticipantWidget = (props) => {
  const { storeStates, ...other } = props;

  return (
    <CardWidget
      _name="text"
      {...other}
    >
      <div className="ui segment">
        <button onClick={() => props.storeActions.addParticipant('toto')}>add</button>
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
