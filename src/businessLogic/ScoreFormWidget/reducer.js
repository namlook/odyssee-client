
import recordStoreReducer from '../RecordStore/reducer';

export default recordStoreReducer({
  schema: {
    _id: 'string',
    participant: 'string',
    at: 'number',
    score: 'string',
  },
});