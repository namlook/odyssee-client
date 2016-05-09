
import { extractWidgets, extractStores, pascalCase } from './utils/core';

const createReducer = (name, config) => (reducerFn) => {
  const reducer = typeof reducerFn === 'function' ? reducerFn(config) : reducerFn;
  const { initialState, actions, postProcess } = reducer;

  return (state = initialState, action) => {
    if (action._storeName !== name) {
      return state;
    }
    const actionFn = actions[action.type];
    const newState = actionFn ? actionFn(state, action) : state;
    return postProcess ? postProcess(newState) : newState;
  };
};

const extractWidgetReducers = (structure, register) => (
  extractWidgets(structure, register)
    .map(({ store, ...widget }) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const reducer = register.widgets[widgetName].reducer;
      const ownStore = store || {};
      return !reducer
        ? null
        : {
          name: ownStore.name,
          reducerCreator: createReducer(ownStore.name, store || {})(reducer),
        };
    })
    .reduce((acc, item) => (
      item && item.name ? { ...acc, [item.name]: item.reducerCreator } : acc
    ), {})
);

const extractStoreReducers = (structure, register) => (
  extractStores(structure, register)
    .map((store) => {
      const storeName = `${pascalCase(store.type)}Store`;
      if (!register.stores[storeName]) {
        throw new Error(`unregistered store ${storeName}`);
      }
      const reducer = register.stores[storeName].reducer;
      return reducer
        ? { name: store.name, reducerCreator: createReducer(store.name, store)(reducer) }
        : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.reducerCreator } : acc), {})
);

export default (structure, register) => ({
  ...extractWidgetReducers(structure, register),
  ...extractStoreReducers(structure, register),
});
