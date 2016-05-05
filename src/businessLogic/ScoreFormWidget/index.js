
export Component from './ScoreFormWidget.jsx';
export * as actions from '../RecordStore/actions';
export * as constants from '../RecordStore/constants';
import recordStoreReducer from '../RecordStore/reducer';

export const reducer = recordStoreReducer({
  schema: {
    _id: 'string',
    participant: 'string',
    at: 'number',
    score: 'string',
  },
});
