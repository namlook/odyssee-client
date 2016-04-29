import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

const AreWeOpenWidget = (props) => {
  const { storeState, linkedStates } = props;
  const { currentWeather } = storeState[linkedStates.weatherCheck];

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
  name: PropTypes.string.isRequired,
  storeState: PropTypes.object.isRequired,
  linkedStates: PropTypes.object.isRequired,
};

export default AreWeOpenWidget;
