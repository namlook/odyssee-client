
import _ from 'lodash';

export const pascalCase = (string) => string.split('-').map((s) => _.capitalize(s)).join('');


const _extractPages = (struct, id = 'application') => (
  _(struct)
    .keys(struct)
    .flatMap((pageName) => {
      if (pageName[0] === '_') return []; // skip pages which begins with '_'

      const newId = `${id}.${pageName}`;
      if (!struct[pageName].widgets && !struct[pageName].redirect) {
        return _extractPages(struct[pageName], newId);
      }
      return { id: newId, name: pageName, config: struct[pageName] };
    })
    .value()
);


export const extractPages = (struct) => _extractPages(struct.pages);

export const extractWidgets = (struct) => (
  _(extractPages(struct))
    .flatMap((pageConfig) => pageConfig.config.widgets || [])
    .value()
);

export const extractWidgetClassNames = (struct) => (
  extractWidgets(struct).map((widgetConfig) => `${pascalCase(widgetConfig.type)}Widget`)
);

export const extractStores = (struct) => struct.stores;


// import structure from '../../config/structure';
// console.log(JSON.stringify(extractPages(structure), null, 2));
