

import { unflatten } from 'flat';
import { Route, IndexRoute } from 'react-router';
import React from 'react';

import pageComponentFactory from './page-component-factory';

import { extractPages } from './utils/core';
import _ from 'lodash';

const _buildRoutes = (routeInfos, pageComponents) => {
  const orderedRoutes = _.reverse(_.sortBy(Object.keys(routeInfos), 'path'));

  return orderedRoutes.map((routeName) => {
    const routeConfig = routeInfos[routeName];

    if (routeConfig.outlet) {
      const outletConfig = routeConfig.outlet;
      const pageOutletComponent = pageComponents[outletConfig.id];
      return (
        <Route
          key={outletConfig.id}
          name={outletConfig.id}
          path={outletConfig.path}
          component={pageOutletComponent}
        >
          {_buildRoutes(routeConfig, pageComponents)}
        </Route>
      );
    }

    const pageComponent = pageComponents[routeConfig.id];
    const TheRoute = routeName === 'index' ? IndexRoute : Route;
    return (
      <TheRoute
        key={routeConfig.id}
        name={routeConfig.id}
        path={routeConfig.path}
        component={pageComponent} />
    );
  });
};


const buildPageComponents = (structure, register, actions) => {
  const pageComponent = pageComponentFactory(structure, register, actions);
  return extractPages(structure).reduce((acc, page) => ({
    ...acc, [page.id]: pageComponent(page.id),
  }), {});
};

export default (structure, register, actions) => {
  const pageComponents = buildPageComponents(structure, register, actions);

  const routesInfos = unflatten(
    extractPages(structure).reduce((acc, { id, config }) => (
      { ...acc, [id]: { id, path: config.path } }
    ), {})
  );
  return _buildRoutes(routesInfos, pageComponents);
};
