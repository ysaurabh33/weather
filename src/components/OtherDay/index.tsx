import React, {ReactNode, useEffect} from "react";
import dayjs from 'dayjs';
import { toFahrenheit } from '../../helper';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getOthers } from "../../store/Selector";
import { Dispatch } from "redux";
import { fetchOtherWeather } from "../../store/Controller";
import './index.css';

interface OtherDayProps {
  unit: TemperatureUnit;
}

const OtherDay = ({unit}: OtherDayProps) => {
  const cityData: any = useSelector(getOthers, shallowEqual);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(fetchOtherWeather());
  }, [dispatch]);

  const displayOtherDay = (): Array<ReactNode> | null => {
    const day = dayjs().format('ddd');
    return cityData ? cityData.map((k: any): ReactNode => {
      if (k.day !== day) {
        return (
          <div key={k.day} className='card'>
            <h5>{k.day}</h5>
            <h5 className='card-temp'>
              {unit === 'F' ? toFahrenheit(k.max) : Math.ceil(k.max)}<sup>o</sup>{unit}
              <span>/{unit === 'F' ? toFahrenheit(k.min) : Math.ceil(k.min)}<sup>o</sup>{unit}</span>
            </h5>
            <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${k.icon}.svg`} alt='icon' />
          </div>
        );
      }
    }) : null;
  };

  return (
    <div className='other-day'>
      { cityData !== null && displayOtherDay()}
    </div>
  );
}

export default OtherDay;
