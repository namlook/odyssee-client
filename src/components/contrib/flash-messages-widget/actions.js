
import { PUSH_MESSAGE, DISMISS_MESSAGE } from './constants';
import { createAction } from '../../../utils';

export const pushMessage = createAction(PUSH_MESSAGE, 'message');
export const dismissMessage = createAction(DISMISS_MESSAGE, 'id');
