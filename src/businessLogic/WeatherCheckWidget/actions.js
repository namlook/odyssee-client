
import { WHEATHER_CHANGE } from './constants';

export const currentWeather = (status) => ({ type: WHEATHER_CHANGE, status });
