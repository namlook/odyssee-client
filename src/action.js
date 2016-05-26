
import { extractWidgets, extractStores, pascalCase } from './utils/core';

const _addStoreNameToAction = (storeConfig, actions, actionName, storeName) => {
  const actionFn = actions[actionName](storeName, storeConfig);
  if (typeof actionFn !== 'function') {
    throw new Error(
      `the action \`${actionName}\` triggered from \`${storeName}\` doesn't seems to be a function.`
      + ` Maybe this action need to be wrapped ?`
    );
  }
  return actionFn;
};

const createActions = (actions, storeConfig) => (storeName) => (
  Object.keys(actions)
    .map((actionName) => ({
      name: actionName,
      fn: _addStoreNameToAction(storeConfig, actions, actionName, storeName),
    }))
    .reduce((acc, action) => ({ ...acc, [action.name]: action.fn }), {})
);

const extractWidgetActions = (structure, register) => (
  extractWidgets(structure)
    .map(({ store, ...widget }) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const actions = register.widgets[widgetName].actions;
      const ownStoreName = store && store.name;
      return actions ? { name: ownStoreName, actionCreator: createActions(actions, store) } : null;
    })
    .reduce((acc, item) => (
      item && item.name ? { ...acc, [item.name]: item.actionCreator } : acc
    ), {})
);


const extractStoreActions = (structure, register) => (
  extractStores(structure).map((store) => {
    const storeName = `${pascalCase(store.type)}Store`;
    const storeConfig = register.stores[storeName];
    if (!storeConfig) {
      throw new Error(`unregistered store ${storeName}`);
    }
    const actions = register.stores[storeName].actions;
    return actions ? { name: store.name, actionCreator: createActions(actions, store) } : null;
  })
  .reduce((acc, item) => (item ? { ...acc, [item.name]: item.actionCreator } : acc), {})
);

export default (structure, register) => ({
  ...extractWidgetActions(structure, register),
  ...extractStoreActions(structure, register),
});
