
import {
  ADD_RECORD,
  ADD_BULK_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD,
  DELETE_ALL,

  FETCH_REQUEST,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from './constants';

import { generateUniqID } from '../../utils';

import { Map as iMap, List as iList, Record as iRecord, Iterable } from 'immutable';

export default (config) => {
  const initialState = iMap({
    content: iList(),
    error: null,
    loading: false,
  });

  const CollectionRecord = iRecord(config.recordSchema);
  const createRecord = (_id, attributes) => {
    const recordAttributes = Iterable.isIterable(attributes) ? attributes.toJS() : attributes;
    return new CollectionRecord({ _id, ...recordAttributes });
  };

  const innerActions = {
    [ADD_RECORD]: (state, { record }) => state.update(
      'content', (content) => {
        const immutableRecord = !Iterable.isIterable(record) ?
          new CollectionRecord(record) : record;

        // add
        if (!immutableRecord._id) {
          const _id = generateUniqID();
          if (content.find((rec) => rec._id === _id)) return content;
          const recordWithId = immutableRecord.set('_id', _id);
          return content.push(createRecord(_id, recordWithId));
        }
        // edit
        const recordToUpdate = content.find((entry) => (entry.get('_id') === immutableRecord._id));

        if (!recordToUpdate) {
          return content.push(createRecord(immutableRecord._id, immutableRecord));
        }

        const recordToUpdateIndex = content.indexOf(recordToUpdate);
        return content.update(recordToUpdateIndex, () => record);
      }
    ),

    [ADD_BULK_RECORDS]: (state, { records }) => state.update(
      'content', (content) => content.merge(
        iList(records.map((o) => createRecord(o._id || generateUniqID(), o))) // FIXME
      )
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
    [DELETE_ALL]: () => initialState,
  };

  const remoteActions = {
    [FETCH_REQUEST]: (state) => (state.set('loading', true)),
    [FETCH_SUCCESS]: (state) => (state.set('loading', false)),
    [FETCH_FAIL]: (state, { payload }) => (
      state.set('loading', false).update('error', () => payload)
    ),
  };

  const actions = { ...innerActions, ...remoteActions };

  return { initialState, actions };
};
