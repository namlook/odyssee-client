import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget';

const WeatherCheckWidget = (props) => {
  const { ownStore, ownActions } = props;

  return (
    <CardWidget
      _name="weather-check"
      {...props}
    >
      <div className="ui segment">
        <h3>{ownStore.get('currentWeather')}</h3>
        <button onClick={() => ownActions.weatherChange('sunny')}>
          sunny
        </button>
        <button onClick={() => ownActions.weatherChange('rainy')}>
          rainy
        </button>
      </div>
    </CardWidget>
  );
};

WeatherCheckWidget.propTypes = {
  ownStore: PropTypes.object.isRequired,
  ownActions: PropTypes.object.isRequired,
};

export default WeatherCheckWidget;
