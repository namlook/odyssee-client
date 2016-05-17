
import recordStoreReducer from '../../stores/RecordStore/reducer';

export default recordStoreReducer({
  schema: {
    _id: 'string',
    participant: 'string',
    at: 'number',
    score: 'string',
  },
});
