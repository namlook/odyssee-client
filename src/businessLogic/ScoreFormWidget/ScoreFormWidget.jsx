import React, { PropTypes } from 'react';

import Widget from '../../core/components/Widget.jsx';

import FormField from '../../core/components/contrib/FormField.jsx';
import { routePropTypes } from '../../core/utils/prop-types';
import { browserHistory } from 'react-router';


const computeNextParticipant = (participants, currentRecord) => {
  const currentParticipantIndex = participants.indexOf(
    participants.find((o) => o.name === currentRecord.participant)
  );
  const nextParticipantIndex = currentParticipantIndex + 1 < participants.count()
    ? currentParticipantIndex + 1
    : 0;

  return participants.get(nextParticipantIndex);
};

class ScoreFormWidget extends React.Component {

  componentDidMount() {
    const { participantsStore } = this.props;
    const participants = participantsStore.get('content');
    if (!participants.count()) {
      browserHistory.push('/participants');
    }
  }

  render() {
    const {
      formStore,
      ownStore,
      scoresStore,
      participantsStore,
      formActions,
      ownActions,
      scoresActions,
      params,
      ...other } = this.props;

    // stores
    const _record = (formStore || ownStore);
    const scores = scoresStore.get('content');
    const participants = participantsStore.get('content');

    if (!participants.count()) {
      return null;
    }

    // Actions
    const actions = (formActions || ownActions);
    const onChange = actions.update;
    const onClear = actions.clear;
    const onSave = scoresActions.addRecord;

    // variables
    const record = _record
      .set('score', _record.score || 0)
      .set('participant', _record.participant || participants.get(0).name);
    const sortedCollection = scores.sort((p, n) => p.at > n.at);
    const currentRecord = scores.find((r) => r._id === params.id) || {};
    const currentIndex = sortedCollection.indexOf(currentRecord);

    // Inner actions
    const toPreviousRecord = () => {
      const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
      const previousRecord = sortedCollection.get(previousIndex);
      browserHistory.push(`/scores/${previousRecord._id}`);
      onChange(previousRecord);
    };

    const toNextRecord = () => {
      if (currentIndex + 1 < scores.count()) {
        const nextIndex = currentIndex + 1;
        const nextRecord = sortedCollection.get(nextIndex);
        browserHistory.push(`/scores/${nextRecord._id}`);
        onChange(nextRecord);
      } else {
        browserHistory.push(`/scores/new`);
        const nextParticipant = computeNextParticipant(participants, record);
        onChange({ participant: nextParticipant.name });
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
        newScore = score !== 0 ? score * value : score;
        newScore = newScore < 1 ? score : Math.floor(newScore);
      } else if (operation === '=') {
        newScore = value;
      }
      onChange(record.set('score', newScore));
    };

    const triggerSave = () => {
      if (record.participant) {
        onSave(record);
        const nextParticipant = computeNextParticipant(participants, record);
        onChange({ participant: nextParticipant.name });
      }
    };

    // partials
    const header = currentRecord.participant
      ? <h1>{currentRecord.participant}</h1>
      : (
      <div className="ui form">
        <FormField
          name="participant"
          placeholder="participant"
          value={record.participant}
          onChange={updateParticipant} />
      </div>
    );

    const displayScore = record.score < 0 ? record.score * -1 : record.score || 0;
    const saveButton = !record._id ? (
      <button className="ui item button" onClick={triggerSave}>
        <i className="ui big check icon"></i>
      </button>
    ) : (
      <button className="ui item button" onClick={toNextRecord}>
        <i className="ui big arrow right icon"></i>
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
        <div className="ui three item secondary menu">
          <button className="ui item button" onClick={toPreviousRecord}>
            <i className="ui big arrow left icon"></i>
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
                    onClick={changeScore('+', -5)}
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
                    onClick={changeScore('*', 0.1)}
                  >
                    <i className="ui chevron left icon"></i>
                  </button>
                  <button style={buttonStyle} className="ui basic disabled button">
                    {'00'}
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
  }
}

ScoreFormWidget.propTypes = {
  ...routePropTypes,
  name: PropTypes.string,
  formStore: PropTypes.object,
  ownStore: PropTypes.object,
  scoresStore: PropTypes.object.isRequired,
  participantsStore: PropTypes.object.isRequired,
  formActions: PropTypes.object,
  ownActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default ScoreFormWidget;
