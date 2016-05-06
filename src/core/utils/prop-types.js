
import { PropTypes } from 'react';

/* eslint-disable react/forbid-prop-types */

export const routePropTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routeParams: PropTypes.object,
  routes: PropTypes.array,
  route: PropTypes.object,
};

export const ownPropTypes = (mainLinkedStoreName) => {
  const customPropType = (ownThing) => (props, propName, componentName) => {
    let error;
    if (!props[ownThing] && !props[mainLinkedStoreName]) {
      error = new Error(
        `Missing prop: linked store \`${mainLinkedStoreName}\` or prop \`name\` should
        be supplied to ${componentName}. Validation failed.`
      );
    }
    return error;
  };
  return {
    name: PropTypes.string,
    ownStore: customPropType('ownStore'),
    ownActions: customPropType('ownActions'),
  };
};
