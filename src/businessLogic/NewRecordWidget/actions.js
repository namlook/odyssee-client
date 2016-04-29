
import { SAVE, CLEAR, CHANGE } from './constants';

export const save = () => {
  console.log('save action from NewRecordWidget');
  return { type: SAVE };
};

export const changeValue = (value) => {
  console.log('changeValue action from NewRecordWidget');
  return { type: CHANGE, value };
};

export const clearForm = () => {
  console.log('clearForm action from NewRecordWidget');
  return { type: CLEAR };
};
