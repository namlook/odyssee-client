import React, { PropTypes } from 'react';

import CardWidget from '../components/CardWidget.jsx';

const ScoreStatsWidget = (props) => {
  const { storeStates, ...other } = props;

  return (
    <CardWidget
      _name="text"
      {...other}
    >
      <div className="ui segment">
        <ul>
        {storeStates.resource.collection.outlet.records.map((item) => (
          <li key={`${item.participant}::${item.date}`}>{item.participant}: {item.score}</li>
        ))}
        </ul>
      </div>
    </CardWidget>
  );
};

ScoreStatsWidget.propTypes = {
  className: PropTypes.string,
  storeStates: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default ScoreStatsWidget;
