import React, { PropTypes } from 'react';

import Widget from '../Widget';
import WidgetGrid from '../WidgetGrid';

/* eslint-disable react/no-danger */

const GridWidget = (props) => {
  const { widgets, ...other } = props;
  return (
    <Widget _name="widget-grid" {...other}>
      <WidgetGrid {...other} className={`widget-grid`}>
        {widgets.map((widget, keyIdx) => props.generateWidgetComponent(widget, props, keyIdx))}
      </WidgetGrid>
    </Widget>
  );
};

GridWidget.propTypes = {
  widgets: PropTypes.array,
  generateWidgetComponent: PropTypes.func,
};

export default GridWidget;
