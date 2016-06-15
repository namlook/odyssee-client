
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

const _extractWidgets = (config) => (
  _(config.widgets || [])
    .flatMap((widget) => {
      if (widget.type === 'grid') {
        return _extractWidgets(widget);
      }
      return [widget];
    })
    .value()
);

export const extractWidgets = (struct) => (
  _(extractPages(struct))
    .flatMap((pageConfig) => _extractWidgets(pageConfig.config))
    .value()
);

export const extractWidgetClassNames = (struct) => (
  extractWidgets(struct).map((widgetConfig) => `${pascalCase(widgetConfig.type)}Widget`)
);

const _extractStores = (struct) => (
  _(extractPages(struct))
    .flatMap((pageConfig) => pageConfig.config.stores || [])
    .value()
);

export const extractStores = (struct) => (struct.stores || []).concat(_extractStores(struct));


// import structure from '../../config/structure';
// console.log(JSON.stringify(extractPages(structure), null, 2));
