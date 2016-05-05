
import { extractWidgets, extractStores, pascalCase } from './utils/core';

const _addStoreNameToAction = (_storeName, action) => (...variables) => ({
  ...action(...variables),
  _storeName,
});

const createActions = (actions) => (storeName) => (
  Object.keys(actions)
    .map((actionName) => ({
      name: actionName,
      fn: _addStoreNameToAction(storeName, actions[actionName]),
    }))
    .reduce((acc, action) => ({ ...acc, [action.name]: action.fn }), {})
);

const extractWidgetActions = (structure, register) => (
  extractWidgets(structure)
    .map((widget) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const actions = register.widgets[widgetName].actions;
      console.log('**', actions);
      return actions ? { name: widget.name, actionCreator: createActions(actions) } : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.actionCreator } : acc), {})
);


const extractStoreActions = (structure, register) => (
  extractStores(structure).map((store) => {
    const storeName = `${pascalCase(store.type)}Store`;
    const storeConfig = register.stores[storeName];
    if (!storeConfig) {
      throw new Error(`unregistered store ${storeName}`);
    }
    const actions = register.stores[storeName].actions;
    return actions ? { name: store.name, actionCreator: createActions(actions) } : null;
  })
  .reduce((acc, item) => (item ? { ...acc, [item.name]: item.actionCreator } : acc), {})
);

export default (structure, register) => ({
  ...extractWidgetActions(structure, register),
  ...extractStoreActions(structure, register),
});
