
import { PUSH_MESSAGE, DISMISS_MESSAGE } from './constants';
import { generateUniqID } from '../../../utils';
import { List as iList, Record as iRecord } from 'immutable';

export default () => {
  const initialState = iList();

  const MessageRecord = iRecord({
    id: '',
    title: '',
    body: '',
    type: '',
  });

  const actions = {
    [PUSH_MESSAGE]: (state, { message: { id, title, body, type } }) => (
      state.push(new MessageRecord({ id: id || generateUniqID(), title, body, type }))
    ),
    [DISMISS_MESSAGE]: (state, { id }) => (state.filter((message) => message.id !== id)),
  };

  return { initialState, actions };
};
