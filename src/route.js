
/* eslint-disable no-unused-vars */

import { unflatten } from 'flat';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import React from 'react';

import pageComponentFactory from './page-component-factory';

import { extractPages } from './utils/core';
import _ from 'lodash';

// const _buildRoutesOld = (routeInfos, pageComponents) => {
//   const orderedRoutes = _.reverse(_.sortBy(Object.keys(routeInfos), 'path'));
//
//   return orderedRoutes.map((routeName) => {
//     const routeConfig = routeInfos[routeName];
//
//     if (routeConfig.outlet) {
//       const outletConfig = routeConfig.outlet;
//       const pageOutletComponent = pageComponents[outletConfig.id];
//       return (
//         <Route
//           key={outletConfig.id}
//           name={outletConfig.id}
//           path={outletConfig.path}
//           component={pageOutletComponent}
//         >
//           {_buildRoutesOld(routeConfig, pageComponents)}
//         </Route>
//       );
//     } else if (routeName === 'index' && routeConfig.redirect) {
//       return <IndexRedirect key={routeConfig.id} to={routeConfig.redirect} />;
//     } else if (routeConfig.id) {
//       const pageComponent = pageComponents[routeConfig.id];
//
//       if (routeName === 'index') {
//         return (
//           <IndexRoute
//             key={routeConfig.id}
//             name={routeConfig.id}
//             component={pageComponent} />
//         );
//       }
//
//       return (
//         <Route
//           key={routeConfig.id}
//           name={routeConfig.id}
//           path={routeConfig.path}
//           component={pageComponent} />
//       );
//     }
//
//     return _buildRoutesOld(routeConfig, pageComponents);
//   });
// };


const _buildRoutes = (routeInfos, pageComponents) => {
  if (_.isArray(routeInfos)) {
    const sortedRoutes = _.reverse(_.sortBy(routeInfos, (o) => {
      if (o.fullPath) {
        if (o.fullPath === '/*') {
          return -1;
        }
        return o.fullPath;
      }
      return o.outlet[0].fullPath;
    }));
    return sortedRoutes.map((routeInfo) => _buildRoutes(routeInfo, pageComponents));
  } else if (routeInfos.outlet) {
    const outletConfig = routeInfos.outlet[0];
    const pageOutletComponent = pageComponents[outletConfig.id];
    return (
      <Route
        key={outletConfig.id}
        name={outletConfig.id}
        path={outletConfig.path}
        component={pageOutletComponent}
      >
        {_buildRoutes(routeInfos.pages, pageComponents)}
      </Route>
    );
  }
  const pageComponent = pageComponents[routeInfos.id];

  if (routeInfos.name === 'index') {
    return (
      <IndexRoute
        key={routeInfos.id}
        name={routeInfos.id}
        component={pageComponent} />
    );
  }

  return (
    <Route
      key={routeInfos.id}
      name={routeInfos.id}
      path={routeInfos.path}
      component={pageComponent} />
  );
};


const buildPageComponents = (structure, register, actions) => {
  const pageComponent = pageComponentFactory(structure, register, actions);
  return extractPages(structure).reduce((acc, page) => ({
    ...acc, [page.id]: pageComponent(page.id),
  }), {});
};

const _extractRoutes = (structure, root = '', id = 'application') => (
  _(structure)
    .keys(structure)
    .flatMap((pageName) => {
      if (pageName[0] === '_') return []; // skip pages which begins with '_'

      const pageId = `${id}.${pageName}`;
      const pagePath = structure[pageName].path || (
        pageName !== 'outlet' && structure[pageName].widgets && pageName
      ) || '';
      if (pageName === 'index') {
        return { fullPath: root || '/', path: '', id: pageId, name: pageName };
      } else if (pageName === 'outlet') {
        const outletId = `${id}.outlet`;
        return { fullPath: '', path: pagePath, id: outletId, name: pageName };
      } else if (pagePath) {
        return { fullPath: `${root}/${pagePath}`, path: pagePath, id: pageId, name: pageName };
      } else if (pageName !== 'outlet' && pageName !== 'index') {
        const { outlet } = structure[pageName];
        const newRoot = outlet && outlet.path ? `${root}/${outlet.path}` : root;
        return _extractRoutes(structure[pageName], newRoot, pageId);
      }
      return null;
    })
    .compact()
    .orderBy(['id', 'fullPath'], ['asc', 'desc'])
    .groupBy((o) => (o.id && o.id.split('.').slice(-1)[0] === 'outlet' ? 'outlet' : 'pages'))
    .value()
);


export const extractRoutes = (structure) => _extractRoutes(structure.pages);

export default (structure, register, actions) => {
  const pageComponents = buildPageComponents(structure, register, actions);
  const routes = extractRoutes(structure);
  return _buildRoutes(routes, pageComponents);
};
