
import { WHEATHER_CHANGE } from './constants';

export const currentWeather = (status) => {
  console.log('action from WeatherCheck');
  return { type: WHEATHER_CHANGE, status };
};
