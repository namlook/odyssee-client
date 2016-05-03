
import { MOVE_UP, MOVE_DOWN } from './constants';
import collectionStoreReducer from '../CollectionStore/reducer';

export default (config) => {
  const collectionStore = collectionStoreReducer(config);

  const moveRecord = (records, _id, position) => {
    const record = records.find((o) => o._id === _id);

    if (record.position + position >= records.count() || record.position + position < 0) {
      return records;
    }

    const upperRecord = records.find((o) => o.position === record.position + position);
    const filteredRecords = records.filter((o) =>
      o._id !== _id && o._id !== upperRecord._id
    );

    return filteredRecords
      .push(record.set('position', record.position + position))
      .push(upperRecord.set('position', upperRecord.position - position));
  };

  const actions = {
    ...collectionStore.actions,
    [MOVE_UP]: (state, { _id }) => state.update(
      'records', (records) => moveRecord(records, _id, 1)
    ),
    [MOVE_DOWN]: (state, { _id }) => state.update(
      'records', (records) => moveRecord(records, _id, -1)
    ),
  };

  /** order the records after process **/
  const postProcess = (state) => state.update('records', (records) =>
    records.sort((o, o2) => o.position > o2.position)
  );

  return { initialState: collectionStore.initialState, actions, postProcess };
};
