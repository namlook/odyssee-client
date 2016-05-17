import React, { PropTypes } from 'react';

import CardWidget from '../../components/CardWidget';

const AreWeOpenWidget = (props) => {
  const { weatherStore } = props;
  const currentWeather = weatherStore.get('currentWeather');

  const status = currentWeather === 'rainy' ? "no we are not :(" : "yes we are ! :)";

  return (
    <CardWidget
      _name="are-we-open"
      {...props}
    >
      <div className="ui segment">
        <h3>{status}</h3>
      </div>
    </CardWidget>
  );
};

AreWeOpenWidget.propTypes = {
  weatherStore: PropTypes.object.isRequired,
};

export default AreWeOpenWidget;
