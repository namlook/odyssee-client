
import structure from './structure';
import register from './register';

import { buildRoutes, extractActions } from './core';

const actions = extractActions(structure, register);

export default buildRoutes(structure, register, actions);
