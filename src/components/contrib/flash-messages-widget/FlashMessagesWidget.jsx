import React, { PropTypes } from 'react';

import Widget from '../../Widget';

const Message = ({ title, body, type, onClick }) => (
  <div className={`ui ${type} message`}>
    <i className="close icon" onClick={onClick}></i>
    {title != null ? (<div className="header"> {title} </div>) : null}
    <p>{body}</p>
  </div>
);

Message.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const FlashMessagesWidget = (props) => {
  const { ownStore, ownActions, ...other } = props;

  const dismissMessage = (id) => () => ownActions.dismissMessage(id); // TODO dismiss message

  const messages = ownStore.map(({ id, title, body, type }) =>
    <Message key={id} title={title} body={body} type={type} onClick={dismissMessage(id)} />
  );

  return messages.count() ? (
    <Widget _name="flash-messages" {...other}>
      <div className="ui basic segment">
        {messages}
      </div>
    </Widget>
  ) : null;
};


FlashMessagesWidget.propTypes = {
  ownStore: PropTypes.object.isRequired,
  ownActions: PropTypes.object.isRequired,
};

export default FlashMessagesWidget;
