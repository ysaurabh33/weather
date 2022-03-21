import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { shallowEqual, useSelector } from "react-redux";
import { getCityName, getCountry } from "../../store/Selector";
import './index.css';

/* Can be replace by city Images */
const background = [require('../../assets/bg-img1.jpg'), require('../../assets/bg-img2.jpg'), require('../../assets/bg-img3.jpg'), require('../../assets/bg-img4.jpg'), require('../../assets/bg-img5.jpg')];


const CityImage = () => {

  const [bg, setBg] = useState(0);
  const city: string = useSelector(getCityName, shallowEqual);
  const country: string = useSelector(getCountry, shallowEqual);

  useEffect(() => {
    setBg(Math.floor(Math.random() * 5));
  }, [city]);

  return (
    <div className='city-block'>
      <div style={{backgroundImage: `url("${background[bg]}")`}} className='city-image'>
        <h2>{`${city}, ${country}`}</h2>
        <h5>{dayjs().format('ddd, D MMM, YYYY')}</h5>
      </div>)
    </div>
  );
}

export default CityImage;