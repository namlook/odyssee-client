import React, { PropTypes } from 'react';

import CardWidget from '../../core/components/CardWidget.jsx';

import { ownPropTypes } from '../../core/utils/prop-types';

const RecordDisplayWidget = (props) => {
  const {
    recordStore,
    ownStore,
    fields,
  } = props;

  const record = recordStore || ownStore;

  return (
    <CardWidget
      _name="new-record"
      {...props}
    >
      {fields.map((field) => (
        <div key={field.name} className="ui segment">
          <h3>{field.label}</h3>
          {record[field.name]}
        </div>
      ))}
    </CardWidget>
  );
};

RecordDisplayWidget.propTypes = {
  ...ownPropTypes('recordStore'),
  recordStore: PropTypes.object,
  fields: PropTypes.array.isRequired,
};

export default RecordDisplayWidget;
