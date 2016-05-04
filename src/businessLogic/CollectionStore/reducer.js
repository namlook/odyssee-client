
import { ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from './constants';
import { Map as iMap, List as iList, Record as iRecord } from 'immutable';
const generateUniqID = () => `${Math.random() * Math.pow(10, 20)}-${Date.now()}`;

export default (config) => {
  const initialState = iMap({
    records: iList(),
  });

  const CollectionRecord = iRecord(config.recordSchema);
  const createRecord = (_id, attributes) => new CollectionRecord({ _id, ...attributes.toJS() });


  const actions = {
    [ADD_RECORD]: (state, { record }) => state.update(
      'records', (records) => {
        const _id = record._id || generateUniqID();
        if (records.find((rec) => rec._id === _id)) return records;
        return records.push(createRecord(_id, record));
      }
    ),

    [UPDATE_RECORD]: (state, { _id, attributes }) => state.update(
      'records', (records) => {
        const newRecords = records.filter((entry) => entry.get('_id') !== _id);
        return newRecords.push(createRecord(_id, attributes));
      }
    ),

    [DELETE_RECORD]: (state, { _id }) => state.update(
      'records', (records) => records.filter((entry) => entry.get('_id') !== _id)
    ),
  };

  return { initialState, actions };
};
