
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
