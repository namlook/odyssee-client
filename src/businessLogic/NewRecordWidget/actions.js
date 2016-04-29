
import { CLEAR, CHANGE } from './constants';

export const changeValue = (value) => ({ type: CHANGE, value });

export const clearForm = () => ({ type: CLEAR });
