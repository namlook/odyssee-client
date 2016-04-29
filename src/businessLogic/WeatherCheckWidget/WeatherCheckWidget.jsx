import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const WeatherCheckWidget = (props) => {
  const { storeState, storeActions, name } = props;
  const ownState = storeState[name];
  const ownActions = storeActions[name];
  
  return (
    <CardWidget
      _name="weather-check"
      {...props}
    >
      <div className="ui segment">
        <h3>{ownState.currentWeather}</h3>
        <button onClick={() => ownActions.currentWeather('sunny')}>
          sunny
        </button>
        <button onClick={() => ownActions.currentWeather('rainy')}>
          rainy
        </button>
      </div>
    </CardWidget>
  );
};

WeatherCheckWidget.propTypes = {
  name: PropTypes.string.isRequired,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default WeatherCheckWidget;
