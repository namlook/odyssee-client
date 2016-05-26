
import _ from 'lodash';

const fillParams = (routeParamsMapping, routeParams) => (
  Object.keys(routeParamsMapping || {}).reduce((acc, propertyName) => {
    const value = routeParamsMapping[propertyName];
    return { ...acc, [propertyName]: value[0] === ':' ? routeParams[value.slice(1)] : value };
  }, {})
);

export const findRecordFromStore = (collectionStore, routeParamsMapping, routeParams) => {
  const queryFilter = fillParams(routeParamsMapping, routeParams);
  return !_.isEmpty(queryFilter) && collectionStore.get('content').find(_.matches(queryFilter));
};

/**
 * Allow to create an action without boilerplate
 */
export const createAction = (ACTION_TYPE, ...variables) => (_storeName) => (...args) => {
  const content = variables.reduce((acc, variableName, index) => ({
    ...acc,
    [variableName]: args[index],
  }), {});
  return {
    payload: content,
    type: ACTION_TYPE,
    _storeName,
  };
};

export const generateUniqID = () => `${Math.random() * Math.pow(10, 20)}-${Date.now()}`;
