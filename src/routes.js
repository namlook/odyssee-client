
import structure from './config/structure';
import register from './register';

import { router, extractActions } from './core';

const actions = extractActions(structure, register);

export default router(structure, register, actions);
