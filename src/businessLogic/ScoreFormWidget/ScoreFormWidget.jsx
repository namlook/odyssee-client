import React, { PropTypes } from 'react';

import Widget from '../../core/components/Widget.jsx';
// import ScoreCollectionNavbarWidget from '../ScoreCollectionNavbarWidget';

const ScoreFormWidget = (props) => {
  const { storeState, storeActions, on, link } = props;
  const record = storeState[link.record];

  const onChange = storeActions[on.change.on][on.change.dispatch];

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
    onChange('score', newScore);
  };

  const displayScore = record.score < 0 ? record.score * -1 : record.score || 0;

  const onSave = storeActions[on.save.on][on.save.dispatch];
  const onClear = storeActions[on.clear.on][on.clear.dispatch];

  const triggerSave = () => {
    onSave(record);
    onClear();
  };

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
      {...props}
    >
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
            <button className="ui basic button" onClick={changeScore('=', 0)}>{'reset'}</button>
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
      <div className="ui right aligned basic segment">
        <button className="ui basic teal button" onClick={triggerSave}>save</button>
      </div>
    </Widget>
  );
};

ScoreFormWidget.propTypes = {
  on: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  displaySubmitButtons: PropTypes.bool,
};

export default ScoreFormWidget;
