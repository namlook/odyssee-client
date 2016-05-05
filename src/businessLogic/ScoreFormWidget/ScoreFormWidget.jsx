import React, { PropTypes } from 'react';

import Widget from '../../core/components/Widget.jsx';

import FormField from '../../core/components/contrib/FormField.jsx';
import { routePropTypes } from '../../core/utils/prop-types';
import { browserHistory } from 'react-router';


const ScoreFormWidget = (props) => {
  const { storeState, storeActions, name, link, params, ...other } = props;

  const recordStoreName = link.record || name;
  // stores
  const record = storeState[recordStoreName];
  const collection = storeState[link.collection].get('records');

  // Actions
  const onChange = storeActions[recordStoreName].update;
  const onSave = storeActions[link.collection].addRecord;
  const onClear = storeActions[recordStoreName].clear;

  // variables
  const sortedCollection = collection.sort((p, n) => p.at > n.at);
  const currentRecord = collection.find((r) => r._id === params.id) || {};
  const currentIndex = sortedCollection.indexOf(currentRecord);

  // Inner actions
  const toPreviousRecord = () => {
    const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    const previousRecord = sortedCollection.get(previousIndex);
    browserHistory.push(`/scores/${previousRecord._id}`);
    onChange(previousRecord);
  };

  const toNextRecord = () => {
    if (currentIndex + 1 < collection.count()) {
      const nextIndex = currentIndex + 1;
      const nextRecord = sortedCollection.get(nextIndex);
      browserHistory.push(`/scores/${nextRecord._id}`);
      onChange(nextRecord);
    } else {
      browserHistory.push(`/scores/new`);
      onClear();
    }
  };

  const updateParticipant = (propertyName, participantName) =>
    onChange(record.set('participant', participantName));

  const changeScore = (operation, value) => () => {
    const score = record.score || 0;
    let newScore;
    if (operation === '+') {
      newScore = score + value;
      newScore = newScore < 0 ? 0 : newScore;
    } else if (operation === '*') {
      newScore = score * value;
    } else if (operation === '/') {
      newScore = score !== 0 ? score / value : score;
      newScore = newScore < 1 ? score : newScore;
    } else if (operation === '=') {
      newScore = value;
    }
    onChange(record.set('score', newScore));
  };

  const triggerSave = () => {
    onSave(record);
    browserHistory.push(`/scores/new`);
    onClear();
  };

  // partials
  const header = currentRecord.participant ? currentRecord.participant : (
    <div className="ui form">
      <FormField name="participant" value={record.participant} onChange={updateParticipant} />
    </div>
  );

  const displayScore = record.score < 0 ? record.score * -1 : record.score || 0;
  const saveButton = !record._id ? (
    <button className="ui item button" onClick={triggerSave}>save</button>
  ) : (
    <button className="ui item button" onClick={toNextRecord}>
      <i className="ui arrow right icon"></i>
    </button>
  );


  // styles
  const buttonStyle = { fontSize: '2rem' };
  const minusButtonStyle = {
    fontSize: '9rem',
    padding: 0,
    paddingRight: '1rem',
    color: record.score < 0 ? '#000' : 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  return (
    <Widget
      _name="new-record"
      {...other}
    >
      <div className="ui three item menu">
        <button className="ui item button" onClick={toPreviousRecord}>
          <i className="ui arrow left icon"></i>
        </button>
        <div className="item">
          {header}
        </div>
        {saveButton}
      </div>
      <div className="ui form basic segment">
        <div className="field">
          <div className="ui center aligned container">
            <h1 style={{ fontSize: '9rem' }}>
              <div className="ui buttons">
                <button
                  style={minusButtonStyle}
                  className="ui button"
                  onClick={changeScore('*', -1)}
                >
                  {'-'}
                </button>
              </div>
              {displayScore}
            </h1>
            <button className="ui basic button" onClick={() => onClear()}>{'reset'}</button>
            <div>
              <div className="ui buttons">
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('+', -1)}
                >
                  <i className="ui chevron left icon"></i>
                </button>
                <button style={buttonStyle} className="ui basic disabled button">
                  {'+1'}
                </button>
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('+', 1)}
                >
                  <i className="ui chevron right icon"></i>
                </button>
              </div>
            </div>
            <div>
              <div className="ui buttons">
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('-', -5)}
                >
                  <i className="ui chevron left icon"></i>
                </button>
                <button style={buttonStyle} className="ui basic disabled button">
                  {'+5'}
                </button>
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('+', 5)}
                >
                  <i className="ui chevron right icon"></i>
                </button>
              </div>
            </div>
            <div>
              <div className="ui buttons">
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('/', 10)}
                >
                  <i className="ui chevron left icon"></i>
                </button>
                <button style={buttonStyle} className="ui basic disabled button">
                  {'x10'}
                </button>
                <button
                  className="ui basic button"
                  style={buttonStyle}
                  onClick={changeScore('*', 10)}
                >
                  <i className="ui chevron right icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
};

ScoreFormWidget.propTypes = {
  ...routePropTypes,
  name: PropTypes.string.isRequired,
  // on: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default ScoreFormWidget;
