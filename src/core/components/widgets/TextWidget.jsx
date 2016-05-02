import React, { PropTypes } from 'react';

import CardWidget from '../CardWidget.jsx';

const TextWidget = (props) => {
  const { content, ...other } = props;

  return (
    <CardWidget _name="text" {...other}>
      <div className="ui segment">
        {content}
      </div>
    </CardWidget>
  );
};

TextWidget.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
};

export default TextWidget;
