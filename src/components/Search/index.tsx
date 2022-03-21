import React, {useRef} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getError } from "../../store/Selector";
import { fetchOtherWeather, fetchTodayWeather } from "../../store/Controller";
import { Dispatch } from "redux";
import './index.css';

interface SearchProps {
  unit: TemperatureUnit;
  setUnit: (value: TemperatureUnit) => void;
}

const Search = ({ unit, setUnit }: SearchProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const input = useRef<HTMLInputElement | null>(null);
  const error: any = useSelector(getError, shallowEqual);
  
  const searchData = (event: any) => {
    event.preventDefault();
    if (input.current && input.current.value !== "") {
      console.log(input.current.value)
      dispatch(fetchTodayWeather(input.current.value));
      dispatch(fetchOtherWeather(input.current.value));
    }
  }

  return (
    <>
      <div className='search-area'>
        <form className='search' onSubmit={searchData}>
          <input ref={input} className='city-name' placeholder='city name' type="text" />
        </form>
        <button className={unit === 'C' ? 'active' : ''} onClick={() => setUnit('C')}>C</button>
        <button className={unit === 'F' ? 'active' : ''} onClick={() => setUnit('F')}>F</button>
      </div>
      {error && <p style={{ textAlign: 'center', color: 'red', fontSize: "0.8em" }}>{error}</p>}
    </>
  );
}

export default Search;