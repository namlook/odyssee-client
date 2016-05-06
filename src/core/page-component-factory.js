import React from 'react';

import connectComponent from './connect-component';

import WidgetGrid from './components/WidgetGrid.jsx';


import { extractPages, pascalCase } from './utils/core';
import _ from 'lodash';

export const getPageConfig = (struct, id) => {
  const pages = extractPages(struct);
  return _.find(pages, { id });
};

export default (structure, register, actions) => (path) => {
  const generateWidgetComponent = (widgetConfig, pageProps, keyIndex) => {
    const { type, ...widgetProps } = widgetConfig;
    const widgetName = `${pascalCase(type)}Widget`;
    const widget = register.widgets[widgetName];
    if (!widget) {
      throw new Error(`unregistered widget ${widgetName}`);
    }
    let { Component } = widget;

    const componentProps = Object.keys(widgetProps)
      .map((propName) => ({ name: propName, value: widgetProps[propName] }))
      .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});

    const componentPropTypeNames = Object.keys(Component.propTypes || {});
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

    /** if the component's propTypes contains storeActions or storeState,
     * it means that the component has to be connected to redux store
     */
    // const shouldBeConnected = _.intersection(
    //   componentPropTypeNames,
    //   ['storeActions', 'storeState']
    // ).length;


    // const actionStores = Object.keys(widgetProps.on || {})
    //   .map((actionName) => widgetProps.on[actionName].on);
    // const linkedStores = Object.keys(widgetProps.linkedStores || {})
    //   .map((linkName) => {
    //     const conf = widgetProps.linkedStores[linkName];
    //     return typeof conf === 'object' ? conf.from : conf;
    //   });
    // console.log('*actionStores*', actionStores);
    // console.log('*linkedStores*', linkedStores);
    // const storesToConnect = [widgetConfig.name].concat(actionStores, linkedStores);
    // const storesToConnect = [].concat(actionStores, linkedStores);
    const _linkedStores = widgetProps.linkedStores || {};
    const linkedStores = widgetProps.name
      ? { ..._linkedStores, own: widgetProps.name }
      : _linkedStores;

    const shouldBeConnected = Object.keys(linkedStores).length;
    if (shouldBeConnected) {
      /** first of all, check the name of the store to connect the component
       */
      /** Then connect the component
       */
      Component = connectComponent(actions, linkedStores)(Component);
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
      <WidgetGrid {...props}>
        {config.widgets.map((widget, keyIdx) => generateWidgetComponent(widget, props, keyIdx))}
      </WidgetGrid>
    )
  );

  PageComponent.displayName = `${pascalCase(name)}Page`;
  return PageComponent;
};

//
// import React, { PropTypes } from 'react';
//
// import { connectPage } from '../../core';
// import actions from '../../actions';
//
// import WidgetGrid from '../../core/components/WidgetGrid.jsx';
// import MenuWidget from '../../core/components/widgets/MenuWidget.jsx';
// import HeaderWidget from '../../core/components/widgets/HeaderWidget.jsx';
//
// import { Component as NewRecordWidget } from '../../businessLogic/NewRecordWidget';
// import { Component as ParticipantsEditWidget } from '../../businessLogic/ParticipantsEditWidget';
//
// const NewRecordWidgetConnected = connectPage(actions)(NewRecordWidget);
// const ParticipantsEditWidgetConnected = connectPage(actions)(ParticipantsEditWidget);
//
// export const ParticipantsPage = (props) => (
//   <WidgetGrid>
//     <MenuWidget title="Participants" />
//
//     <NewRecordWidgetConnected
//       title="add participant"
//       name="add-participant"
//       on={{
//         save: { dispatch: 'addRecord', on: 'participants-store' },
//       }}
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }}
//       {...props} />
//
//     <HeaderWidget title="bouh!" icon="smile" subtitle="ahahaha" color="teal" />
//
//     <ParticipantsEditWidgetConnected
//       title="All the participants"
//       icon="users"
//       name="participants-edit-list"
//       link={{
//         collection: { to: 'records', from: 'participants-store' },
//       }} // use to diplay the records
//       on={{
//         rename: { dispatch: 'updateRecord', on: 'participants-store' },
//         delete: { dispatch: 'deleteRecord', on: 'participants-store' },
//         moveUp: { dispatch: 'moveUp', on: 'participants-store' },
//         moveDown: { dispatch: 'moveDown', on: 'participants-store' },
//       }}
//       {...props} />
//
//   </WidgetGrid>
// );
//
//
// export default ParticipantsPage;
