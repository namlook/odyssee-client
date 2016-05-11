import React from 'react';

import connectComponent from './connect-component';

import WidgetGrid from './components/WidgetGrid.jsx';


import { extractPages, pascalCase, extractStores, extractWidgets } from './utils/core';
import _ from 'lodash';

export const getPageConfig = (struct, id) => {
  const pages = extractPages(struct);
  return _.find(pages, { id });
};

const getAllStoreNames = (structure) => {
  const results = [].concat(
    extractStores(structure).map((o) => o.name),
    extractWidgets(structure).map(({ store }) => store && store.name),
  );
  return _.compact(results);
};

export default (structure, register, actions) => (path) => {
  const generateWidgetComponent = (widgetConfig, pageProps, keyIndex) => {
    const { type, store, ...widgetProps } = widgetConfig;
    const widgetName = `${pascalCase(type)}Widget`;
    const widget = register.widgets[widgetName];

    if (!widget) {
      throw new Error(`unregistered widget ${widgetName}`);
    }
    let { Component } = widget;

    const componentProps = Object.keys(widgetProps).reduce((acc, propName) => (
      { ...acc, [propName]: widgetProps[propName] }
    ), {});

    const componentPropTypeNames = Object.keys(Component.propTypes || {});
    const requiredProps = componentPropTypeNames.reduce((acc, propName) => {
      if (pageProps[propName] != null) {
        return { ...acc, [propName]: pageProps[propName] };
      }
      return acc;
    }, {});

    const _linkedStores = widgetProps.linkedStores || {};
    const ownStoreName = store && store.name;
    const linkedStores = ownStoreName
      ? { ..._linkedStores, own: ownStoreName }
      : _linkedStores;

    const shouldBeConnected = Object.keys(linkedStores).length;
    if (shouldBeConnected) {
      const storeNamesFound = getAllStoreNames(structure);
      Object.keys(linkedStores).forEach((storeName) => {
        if (storeNamesFound.indexOf(linkedStores[storeName]) === -1) {
          console.warn( // eslint-disable-line no-console
            `ERROR! the store \`${linkedStores[storeName]}\` is linked to the ` +
            `component \`${widgetName}\` as \`${storeName}\` but is not found in structure`,
          );
        }
      });

      Component = connectComponent(actions, linkedStores)(Component);
    }

    const props = { ...requiredProps, ...componentProps, key: `${type}${keyIndex}` };
    return React.createElement(Component, props, pageProps.children);
  };


  const { config, name, id } = getPageConfig(structure, path);
  const PageComponent = (props) => (
    !(config.widgets && config.widgets.length) ? null : (
      <WidgetGrid {...props} className={`${id.split('.').join('-')}-page`}>
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
