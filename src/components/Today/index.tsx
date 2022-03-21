import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { fetchTodayWeather } from "../../store/Controller";
import { getCityName, getToday } from "../../store/Selector";
import { toFahrenheit } from '../../helper';
import './index.css';

interface TodayProps {
  unit: TemperatureUnit;
}

const Today = ({ unit }: TodayProps) => {
  const cityData: any = useSelector(getToday, shallowEqual);
  const city = useSelector(getCityName, shallowEqual);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(fetchTodayWeather());
  }, [dispatch]);

  return cityData !== null ? (
    <>
      <div className='today'>
        <div className='temp'>{unit === 'F' ? toFahrenheit(cityData.temp) : Math.ceil(cityData.temp)}<sup>o</sup>{unit}</div>
        <div className='weather-fix'>
          <div className='weather-image'>
            <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${cityData.icon}.svg`} alt='icon' />
          </div>
          <div className='extra-info'>
            <p>Feels like: {unit === 'F' ? toFahrenheit(cityData.feels_like) : cityData.feels_like}<sup>o</sup>{unit}</p>
            <p>Humidity: { cityData.humidity }</p>
            <p>Wind: {cityData.wind} km/h</p>
            <p>Sunrise: {cityData.sunrise}</p>
            <p>Sunset: {cityData.sunset}</p>
          </div>
        </div>
      </div>
      <h5 className='overall'><span>{ city } - </span>{`${cityData.main}, ${cityData.description}`}</h5>
    </>
  ) : null;
};

export default Today;