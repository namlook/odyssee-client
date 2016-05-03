
import { extractWidgets, extractStores, pascalCase } from './utils/core';

const createReducer =
  (name, dependencies) =>
    ({ initialState, actions, postProcess }) => (state = initialState, action) => {
      if (action._storeName !== name && (dependencies || []).indexOf(action._storeName) === -1) {
        return state;
      }
      const actionFn = actions[action.type];
      const newState = actionFn ? actionFn(state, action) : state;
      return postProcess ? postProcess(newState) : newState;
    };

const extractWidgetReducers = (structure, register) => (
  extractWidgets(structure, register)
    .map((widget) => {
      const widgetName = `${pascalCase(widget.type)}Widget`;
      const widgetConfig = register.widgets[widgetName];
      if (!widgetConfig) {
        throw new Error(`unregistered widget ${widgetName}`);
      }
      const reducer = register.widgets[widgetName].reducer;
      return reducer
        ? { name: widget.name, reducerCreator: createReducer(widget.name)(reducer) }
        : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.reducerCreator } : acc), {})
);

const extractStoreReducers = (structure, register) => (
  extractStores(structure, register)
    .map((store) => {
      const storeName = `${pascalCase(store.type)}Store`;
      const storeConfig = register.stores[storeName];
      if (!storeConfig) {
        throw new Error(`unregistered store ${storeName}`);
      }
      const reducer = register.stores[storeName].reducer;
      return reducer
        ? { name: store.name, reducerCreator: createReducer(store.name)(reducer) }
        : null;
    })
    .reduce((acc, item) => (item ? { ...acc, [item.name]: item.reducerCreator } : acc), {})
);

export default (structure, register) => ({
  ...extractWidgetReducers(structure, register),
  ...extractStoreReducers(structure, register),
});
