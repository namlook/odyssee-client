
import { buildRoutes } from './core';
import structure from './config/structure';

import { extractPages } from './core/utils/core';
import generatePageComponent from './core/generate-page-component';

const buildPageComponents = (struct) => (
  extractPages(struct).reduce((acc, page) => ({
    ...acc, [page.id]: generatePageComponent(page.id),
  }), {})
);

const pageComponents = buildPageComponents(structure);

export default buildRoutes(structure, pageComponents);
