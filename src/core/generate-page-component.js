import React from 'react';

import { connectComponent } from './index';

import WidgetGrid from './components/WidgetGrid.jsx';


import { extractPages, pascalCase } from './utils/core';
import _ from 'lodash';

export const getPageConfig = (struct, id) => {
  const pages = extractPages(struct);
  return _.find(pages, { id });
};

export default (structure, register, actions, path) => {
  const generateWidgetComponent = (widgetConfig, pageProps, keyIndex) => {
    const { type, ...widgetProps } = widgetConfig;
    const widgetName = `${pascalCase(type)}Widget`;
    const widget = register.widgets[widgetName];
    if (!widget) {
      throw new Error(`unregistered widget ${widgetName}`);
    }

    const componentProps = Object.keys(widgetProps)
      .map((propName) => ({ name: propName, value: widgetProps[propName] }))
      .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});

    let { Component } = widget;

    const componentPropTypeNames = Object.keys(Component.propTypes);
    const requiredProps = componentPropTypeNames
      .map((propName) => ({
        name: propName,
        pageProp: pageProps[propName],
      }))
      .reduce((acc, item) => {
        if (item.pageProp != null) {
          return { ...acc, [item.name]: item.pageProp };
        }
        return acc;
      }, {});

    const shouldBeConnected = _.intersection(
      componentPropTypeNames,
      ['storeActions', 'storeState']
    ).length;

    if (shouldBeConnected) {
      Component = connectComponent(actions)(Component);
    }

    return React.createElement(
      Component,
      { ...requiredProps, ...componentProps, key: `${type}${keyIndex}` },
      pageProps.children
    );
  };


  const { config, name } = getPageConfig(structure, path);
  const PageComponent = (props) => (
    !(config.widgets && config.widgets.length) ? null : (
      <WidgetGrid>
        {config.widgets.map((widget, keyIdx) => generateWidgetComponent(widget, props, keyIdx))}
      </WidgetGrid>
    )
  );

  PageComponent.displayName = `${pascalCase(name)}Page`;
  return PageComponent;
};
