import React, { PropTypes } from 'react';

import { connectPage } from './index';

import register from '../register';
import actions from '../actions';
import structure from '../config/structure';

import WidgetGrid from './components/WidgetGrid.jsx';


import { extractPages, pascalCase } from './utils/core';
import _ from 'lodash';

export const getPageConfig = (struct, path) => {
  const pages = extractPages(struct);
  return _.find(pages, { path });
};

// rename: (...args) => props.storeActions['participants-store'].updateRecord(...args),
const generateOnProps = (pageProps, onProps) => (
  Object.keys(onProps).map((onPropName) => (
    { name: onPropName, dispatch: onProps[onPropName].dispatch, on: onProps[onPropName].on }
  )).reduce((acc, item) => (
    { ...acc, [item.name]: (...args) => pageProps.storeActions[item.on][item.dispatch](...args) }
  ), {})
);

const generateWidgetComponent = (widgetConfig, pageProps, keyIndex) => {
  const { type, ...widgetProps } = widgetConfig;
  const widgetName = `${pascalCase(type)}Widget`;
  const widget = register.widgets[widgetName];
  if (!widget) {
    throw new Error(`unregistered widget ${widgetName}`);
  }

  const componentProps = Object.keys(widgetProps)
    .map((propName) => {
      if (propName === 'on') {
        return {
          name: 'on',
          value: generateOnProps(pageProps, widgetProps.on),
        };
      }
      return { name: propName, value: widgetProps[propName] };
    })
    .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});

  const { Component } = widget;
  return (
    <Component
      key={`${type}${keyIndex}`}
      storeState={pageProps.storeState}
      storeActions={pageProps.storeActions}
      {...componentProps} />
    );
};


export default (path) => {
  const { config, name } = getPageConfig(structure, path);
  const PageComponent = (props) => (
    !(config.widgets && config.widgets.length) ? null : (
      <WidgetGrid>
        {config.widgets.map((widget, keyIdx) => generateWidgetComponent(widget, props, keyIdx))}
      </WidgetGrid>
    )
  );

  PageComponent.displayName = `${pascalCase(name)}Page`;
  PageComponent.propTypes = {
    storeActions: PropTypes.object.isRequired,
  };
  return connectPage(actions)(PageComponent);
};
