import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Widget from '../../components/Widget';
import FormField from '../../components/contrib/FormField';
import { routePropTypes } from '../../utils/prop-types';

const ScoreCollectionNavbarWidget = (props) => {
  const { storeState, storeActions, link, params, on, ...other } = props;

  const collection = storeState[link.collectionStore.from].get('records');
  const record = storeState[link.recordStore.from];
  const sortedCollection = collection.sort((p, n) => p.at > n.at);
  const currentRecord = collection.find((r) => r._id === params.id) || {};
  const currentIndex = sortedCollection.indexOf(currentRecord);

  const onChange = storeActions[on.change.on][on.change.dispatch];

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
      onChange({});
    }
  };

  const updateParticipant = (propertyName, name) => onChange(record.set('participant', name));

  const header = currentRecord.participant ? currentRecord.participant : (
    <div className="ui form">
      <FormField name="participant" value={record.participant} onChange={updateParticipant} />
    </div>
  );

  return (
    <Widget _name="collection-list" {...other}>
      <div className="ui three item menu">
        <button className="ui item button" onClick={toPreviousRecord}>
          <i className="ui arrow left icon"></i>
        </button>
        <div className="item">
          {header}
        </div>
        <button className="ui item button" onClick={toNextRecord}>
          <i className="ui arrow right icon"></i>
        </button>
      </div>
    </Widget>
  );
};

ScoreCollectionNavbarWidget.propTypes = {
  ...routePropTypes,
  storeState: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default ScoreCollectionNavbarWidget;
