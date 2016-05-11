
import { ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from './constants';
import { Map as iMap, List as iList, Record as iRecord, Iterable } from 'immutable';
const generateUniqID = () => `${Math.random() * Math.pow(10, 20)}-${Date.now()}`;

export default (config) => {
  const initialState = iMap({
    content: iList(),
  });

  const CollectionRecord = iRecord(config.recordSchema);
  const createRecord = (_id, attributes) => {
    const recordAttributes = Iterable.isIterable(attributes) ? attributes.toJS() : attributes;
    return new CollectionRecord({ _id, ...recordAttributes });
  };


  const actions = {
    [ADD_RECORD]: (state, { record }) => state.update(
      'content', (content) => {
        // add
        if (!record._id) {
          const _id = generateUniqID();
          if (content.find((rec) => rec._id === _id)) return content;
          const recordWithId = record.set('_id', _id);
          return content.push(createRecord(_id, recordWithId));
        }
        // edit
        const recordToUpdate = content.find((entry) => entry.get('_id') === record._id);
        const recordToUpdateIndex = content.indexOf(recordToUpdate);
        return content.update(recordToUpdateIndex, () => record);
      }
    ),

    [UPDATE_RECORD]: (state, { _id, attributes }) => state.update(
      'content', (content) => {
        const recordToUpdate = content.find((entry) => entry.get('_id') === _id);
        const recordToUpdateIndex = content.indexOf(recordToUpdate);
        return content.update(recordToUpdateIndex, () => createRecord(_id, attributes));
      }
    ),

    [DELETE_RECORD]: (state, { _id }) => state.update(
      'content', (content) => content.filter((entry) => entry.get('_id') !== _id)
    ),
  };

  return { initialState, actions };
};
