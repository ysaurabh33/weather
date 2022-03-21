import React, { useState } from 'react';
import "./App.css";
import Today from './components/Today';
import OtherDay from './components/OtherDay';
import CityImage from './components/CityImage';
import Search from './components/Search';

const App = () => {
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  
  return (
    <div className='container'>
      <div className='data'>
        <h1 className='logo'>Weatherapp.</h1>
        <Search unit={unit} setUnit={setUnit} />
        <Today unit={unit} />
        <OtherDay unit={unit} />
      </div>
      <CityImage />
    </div>
  );
};

export default App;
