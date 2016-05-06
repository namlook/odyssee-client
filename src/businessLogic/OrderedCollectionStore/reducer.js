
import { MOVE_UP, MOVE_DOWN } from './constants';
import { ADD_RECORD } from '../CollectionStore/constants';
import collectionStoreReducer from '../CollectionStore/reducer';

export default (config) => {
  const collectionStore = collectionStoreReducer(config);

  const moveRecord = (content, _id, position) => {
    const record = content.find((o) => o._id === _id);

    if (record.position + position >= content.count() || record.position + position < 0) {
      return content;
    }

    const upperRecord = content.find((o) => o.position === record.position + position);
    const filteredRecords = content.filter((o) =>
      o._id !== _id && o._id !== upperRecord._id
    );

    return filteredRecords
      .push(record.set('position', record.position + position))
      .push(upperRecord.set('position', upperRecord.position - position));
  };

  const actions = {
    ...collectionStore.actions,
    [ADD_RECORD]: (state, { record }) => {
      const positionedRecord = record.set('position', state.get('content').count());
      return collectionStore.actions[ADD_RECORD](state, { record: positionedRecord });
    },
    [MOVE_UP]: (state, { _id }) => state.update(
      'content', (content) => moveRecord(content, _id, 1)
    ),
    [MOVE_DOWN]: (state, { _id }) => state.update(
      'content', (content) => moveRecord(content, _id, -1)
    ),
  };

  /** order the content after process **/
  const postProcess = (state) => state.update('content', (content) =>
    content.sort((o, o2) => o.position > o2.position)
  );

  return { initialState: collectionStore.initialState, actions, postProcess };
};
