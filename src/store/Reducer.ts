import * as actionType from './ActionTypes';

const initialState: WeatherState = {
  others: null,
  today: null,
  city: "Toronto",
  country: "CA",
  error: null,
};

const reducer = (state: WeatherState = initialState, action: WeatherAction) => {
  switch (action.type) {
    case actionType.TODAYS_WEATHER: {
      return { ...state, today: action.data.today, city: action.data.city, country: action.data.country, error: null };
    }
    case actionType.OTHER_WEATHER: {
      return { ...state, others: action.data, error: null };
    }
    case actionType.SET_ERROR: {
      return { ...state, error: action.data };
    }
  }
  return state;
};

export default reducer;