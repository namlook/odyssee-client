import React, { PropTypes } from 'react';

import Widget from '../../core/components/Widget.jsx';
import DropdownUI from '../../core/components/ui/DropdownUI.jsx';
// import FormField from '../../core/components/contrib/FormField.jsx';

import { routePropTypes, ownPropTypes } from '../../core/utils/prop-types';
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
    const onSave = scoresActions.addRecord;

    // variables
    let record = _record
      .set('score', _record.score || 0)
      .set('participant', _record.participant || participants.get(0).name);

    if (!record.at) {
      record = record.set('at', Date.now());
    }

    const sortedCollection = scores.sort((p, n) => p.at > n.at);
    const currentRecord = scores.find((r) => r._id === params.id) || {};
    const currentIndex = sortedCollection.indexOf(currentRecord);

    // Inner actions
    const toPreviousRecord = () => {
      const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
      const previousRecord = sortedCollection.get(previousIndex);
      if (previousRecord) {
        browserHistory.push(`/scores/${previousRecord._id}`);
        onChange(previousRecord);
      }
    };

    const toNextRecord = () => {
      onSave(record);
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

    const updateParticipant = (_id, participantName) =>
      onChange(record.set('participant', participantName));

    const changeScore = (operation, value) => () => {
      const score = record.score || 0;
      let newScore;
      if (operation === '+') {
        newScore = score + value;
        newScore = newScore < 0 ? 0 : newScore;
      } else if (operation === '*') {
        newScore = score !== 0 ? score * value : score;
      } else if (operation === '/') {
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
      <DropdownUI className="item selection" onChange={updateParticipant}>
        <input type="hidden" name="participant" />
        <div className="text" style={{ fontSize: '2rem' }}>
          {record.participant}
        </div>
        <i className="ui small dropdown icon"></i>
        <div className="menu">
          {
            participants.map(({ _id, name }) =>
              <div className="item active" dataValue={name} key={_id}>{name}</div>
            )
          }
        </div>
      </DropdownUI>
    );

    const displayScore = record.score < 0 ? record.score * -1 : record.score || 0;
    const disabledBackButton = currentIndex < 0 && !scores.count() || currentIndex === 0;

    const backButton = !record._id ? (
      <button
        className={`ui item ${disabledBackButton ? 'disabled' : ''} button`}
        onClick={toPreviousRecord}
      >
        <i className="ui big delete icon"></i>
      </button>
    ) : (
      <button
        className={`ui item ${disabledBackButton ? 'disabled' : ''} button`}
        onClick={() => { onSave(record); toPreviousRecord(); }}
      >
        <i className="ui big arrow left icon"></i>
      </button>
    );

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
          {backButton}
          {header}
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

              <button className="ui basic button" onClick={changeScore('=', 0)}>
                {'reset'}
              </button>

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
  }
}

ScoreFormWidget.propTypes = {
  ...routePropTypes,
  ...ownPropTypes('fromStore'),

  formStore: PropTypes.object,
  scoresStore: PropTypes.object.isRequired,
  participantsStore: PropTypes.object.isRequired,
  formActions: PropTypes.object,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default ScoreFormWidget;
