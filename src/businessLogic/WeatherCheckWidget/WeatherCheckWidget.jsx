import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget.jsx';

const WeatherCheckWidget = (props) => {
  const { storeState, storeActions, name } = props;
  console.log('!!!', props);
  const ownState = storeState[name];
  const { currentWeather } = storeActions.WeatherCheckWidget;
  return (
    <CardWidget
      _name="weather-check"
      {...props}
    >
      <div className="ui segment">
        <h3>{ownState.currentWeather}</h3>
        <button onClick={() => currentWeather('sunny')}>
          sunny
        </button>
        <button onClick={() => currentWeather('rainy')}>
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
