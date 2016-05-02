
import _ from 'lodash';

export const pascalCase = (string) => string.split('-').map((s) => _.capitalize(s)).join('');


const _extractPages = (struct, path = 'application') => (
  _(struct)
    .keys(struct)
    .flatMap((pageName) => {
      const newPath = `${path}.${pageName}`;
      if (!struct[pageName].widgets) {
        return _extractPages(struct[pageName], newPath);
      }
      return { path: newPath, name: pageName, config: struct[pageName] };
    })
    .value()
);

export const extractPages = (struct) => _extractPages(struct.pages);

export const extractWidgets = (struct) => (
  _(extractPages(struct))
    .flatMap((pageConfig) => pageConfig.config.widgets)
    .value()
);

export const extractWidgetClassNames = (struct) => (
  extractWidgets(struct).map((widgetConfig) => `${pascalCase(widgetConfig.type)}Widget`)
);

export const extractStores = (struct) => struct.stores;


// import structure from '../../config/structure';

// console.log(JSON.stringify(extractWidgets(structure.pages), null, 2));
