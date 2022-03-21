import * as actionTypes from './ActionTypes';
import service from './Service';

const http = service.getInstance();

const addToday = (data: any): WeatherAction => ({
  type: actionTypes.TODAYS_WEATHER,
  data,
});

const addOthers = (data: any): WeatherAction => ({
  type: actionTypes.OTHER_WEATHER,
  data,
});

const setError = (data: string): WeatherAction => ({
  type: actionTypes.SET_ERROR,
  data
});

export const fetchTodayWeather = (cityName: string = '') => async (dispatch: DispatchType, getState: () => WeatherState) => {
  const city = cityName !== "" ? cityName : getState().city;
  try {
    const data = await http.getTodayWeather(city);
    dispatch(addToday(data));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
}

export const fetchOtherWeather = (cityName: string = '') => async (dispatch: DispatchType, getState: () => WeatherState) => {
  const city = cityName !== "" ? cityName : getState().city;
  try {
    const data = await http.getWeather(city);
    dispatch(addOthers(data));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
}
