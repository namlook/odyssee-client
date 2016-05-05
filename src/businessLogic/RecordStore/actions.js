
import { CLEAR, UPDATE, UPDATE_PROPERTY } from './constants';

export const updateProperty = (property, value) => ({ type: UPDATE_PROPERTY, property, value });
export const update = (record) => ({ type: UPDATE, record });

export const clear = () => ({ type: CLEAR });
