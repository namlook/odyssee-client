
import { MOVE_UP, MOVE_DOWN } from './constants';
export * from '../CollectionStore/actions';

export const moveUp = (_id) => ({ type: MOVE_UP, _id });
export const moveDown = (_id) => ({ type: MOVE_DOWN, _id });
