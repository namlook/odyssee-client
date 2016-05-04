
import { CLEAR, UPDATE_PROPERTY } from './constants';

export const updateProperty = (property, value) => ({ type: UPDATE_PROPERTY, property, value });

export const clear = () => ({ type: CLEAR });
