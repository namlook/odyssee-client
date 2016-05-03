
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** export default connect(
//   (state) => {
//     console.log('!!state', this);
//     return { storeState: state };
//   },
//   (dispatch) => ({
//     storeActions: {
//       WeatherCheckWidget: bindActionCreators(_actions.WeatherCheckWidget, dispatch),
//       NewRecordWidget: bindActionCreators(_actions.NewRecordWidget, dispatch),
//       'participants-store': bindActionCreators(
//         _actions.collectionStore('participants-store'),
//         dispatch,
//       ),
//       'other-participants-store': bindActionCreators(
//         _actions.collectionStore('other-participants-store'),
//         dispatch,
//       ),
//     },
//   }),
// )(ApplicationContactPage);
**/
export const connectComponent = (actions) => {
  const _registerActions = (dispatch, _actions) => (
    Object.keys(_actions)
      .map((actionName) => ({ name: actionName, fn: _actions[actionName] }))
      .reduce((acc, action) => ({
        ...acc,
        [action.name]: bindActionCreators(action.fn(action.name), dispatch),
      }), {})
  );

  return connect(
    (state) => ({
      storeState: state,
    }),
    (dispatch) => ({
      storeActions: _registerActions(dispatch, actions),
    }),
  );
};


export const createReducer =
  (name, dependencies) =>
    ({ initialState, actions, postProcess }) => (state = initialState, action) => {
      if (action._storeName !== name && (dependencies || []).indexOf(action._storeName) === -1) {
        return state;
      }
      const actionFn = actions[action.type];
      const newState = actionFn ? actionFn(state, action) : state;
      return postProcess ? postProcess(newState) : newState;
    };


const _addStoreNameToAction = (_storeName, action) => (...variables) => ({
  ...action(...variables),
  _storeName,
});

export const createActions = (actions) => (storeName) => (
  Object.keys(actions)
    .map((actionName) => ({
      name: actionName,
      fn: _addStoreNameToAction(storeName, actions[actionName]),
    }))
    .reduce((acc, action) => ({ ...acc, [action.name]: action.fn }), {})
);

import { unflatten } from 'flat';
import { Route, IndexRoute } from 'react-router';
import React from 'react';
import { extractPages } from './utils/core';

const _buildRoutes = (routeInfos, pageComponents) => (
  Object.keys(routeInfos).map((routeName) => {
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
  })
);

export const buildRoutes = (structure, pageComponents) => {
  const routesInfos = unflatten(
    extractPages(structure).reduce((acc, { id, config }) => (
      { ...acc, [id]: { id, path: config.path } }
    ), {})
  );
  return _buildRoutes(routesInfos, pageComponents);
};

// import structure from '../config/structure';
// console.log(JSON.stringify(buildRoutes(structure), null, 2));
