

import structure from './structure';
import register from './register';
import { buildRoutes, extractActions } from '../lib/core';

const actions = extractActions(structure, register);

export default buildRoutes(structure, register, actions);

// import React from 'react';
// import { Route } from 'react-router';
// import { pageComponentFactory, extractActions } from './core';
//
// const pageComponent = pageComponentFactory(structure, register, actions);
//
// export default (
//   <Route path="/" component={pageComponent('application.outlet')}>
//     <Route
//       name="participants"
//       path="participants"
//       component={pageComponent('application.participants')} />
//     <Route name="contact" path="contact" component={pageComponent('application.contact')} />
//     <Route name="notfound" path="*" component={pageComponent('application.404')} />
//   </Route>
// );
