
import { ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from './constants';

import { Map as iMap, List as iList, Record as iRecord } from 'immutable';

const initialState = iMap({
  records: iList(),
});

// TODO put the record schema else where in CollectionStore config
const CollectionRecord = iRecord({ _id: null, name: null, position: null });

const createRecord = (_id, attributes) => new CollectionRecord({ _id, ...attributes });

const actions = {
  [ADD_RECORD]: (state, { _id, attributes }) => state.update(
    'records', (records) => records.push(createRecord(_id, attributes))
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

export default { initialState, actions };
