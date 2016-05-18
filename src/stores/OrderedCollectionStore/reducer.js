//
// import { MOVE_UP, MOVE_DOWN } from './constants';
// import { ADD_RECORD } from '../CollectionStore/constants';
// import collectionStoreReducer from '../CollectionStore/reducer';
//
// export default (config) => {
//   const collectionStore = collectionStoreReducer(config);
//
//   const moveRecord = (content, _id, position) => {
//     const record = content.find((o) => o._id === _id);
//
//     if (record.position + position >= content.count() || record.position + position < 0) {
//       return content;
//     }
//
//     const upperRecord = content.find((o) => o.position === record.position + position);
//     const filteredRecords = content.filter((o) =>
//       o._id !== _id && o._id !== upperRecord._id
//     );
//
//     return filteredRecords
//       .push(record.set('position', record.position + position))
//       .push(upperRecord.set('position', upperRecord.position - position));
//   };
//
//   const actions = {
//     ...collectionStore.actions,
//     [ADD_RECORD]: (state, { record }) => {
//       const positionedRecord = record.set('position', state.get('content').count());
//       return collectionStore.actions[ADD_RECORD](state, { record: positionedRecord });
//     },
//     [MOVE_UP]: (state, { _id }) => state.update(
//       'content', (content) => moveRecord(content, _id, 1)
//     ),
//     [MOVE_DOWN]: (state, { _id }) => state.update(
//       'content', (content) => moveRecord(content, _id, -1)
//     ),
//   };
//
//   /** order the content after process **/
//   const postProcess = (state) => state.update('content', (content) =>
//     content.sort((o, o2) => o.position > o2.position)
//   );
//
//   return { initialState: collectionStore.initialState, actions, postProcess };
// };


import { MOVE_UP, MOVE_DOWN } from './constants';
import collectionStoreReducer from '../CollectionStore/reducer';

export default (config) => {
  const collectionStore = collectionStoreReducer(config);

  const moveDownRecord = (content, _id) => {
    const record = content.find((o) => o._id === _id);

    const currentRecordIndex = content.indexOf(record);
    if (currentRecordIndex < 1) return content;

    const results = content.slice(0, currentRecordIndex - 1).concat(
      [record],
      content.slice(currentRecordIndex - 1, currentRecordIndex),
      content.slice(currentRecordIndex + 1)
    );

    return results;
  };

  const moveUpRecord = (content, _id) => {
    const record = content.find((o) => o._id === _id);

    const currentRecordIndex = content.indexOf(record);
    if (currentRecordIndex < 0) return content;

    return content.slice(0, currentRecordIndex).concat(
      content.slice(currentRecordIndex + 1, currentRecordIndex + 2),
      [record],
      content.slice(currentRecordIndex + 2)
    );
  };

  const actions = {
    ...collectionStore.actions,
    [MOVE_UP]: (state, { _id }) => state.update(
      'content', (content) => moveUpRecord(content, _id)
    ),
    [MOVE_DOWN]: (state, { _id }) => state.update(
      'content', (content) => moveDownRecord(content, _id)
    ),
  };

  return { initialState: collectionStore.initialState, actions };
};
