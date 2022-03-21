import axios, { AxiosInstance } from "axios";
import dayjs from 'dayjs';

const API_KEY = "";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";

class Service {
  private static instance: Service;
  private http: AxiosInstance;
  private params: {[key: string]: string} = {appid: API_KEY, units: "metric"}

  private constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-type': "application/json"
      }
    });
  }
  
  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  /**
   * To Fetch data for Other date i.e. next 5 Days
   * @param cityName
   * @returns Promise<object>
   */
  public getWeather(cityName: string): Promise<object> {
    return new Promise((resolve, reject) =>
       this.http.get('forecast', { params: { ...this.params, q: cityName } })
        .then(response => {
          const list = response.data.list;
          const other = [];
          let i = 0;
          let min = 0;
          let max = 0;
          let num = 0;
          let day = dayjs(list[0].dt_txt).format('ddd');
          while (i < list.length) {
            const newDay = dayjs(list[i].dt_txt).format('ddd');
            if (day === newDay && i !== (list.length - 1)) {
              min += list[i].main.temp_min;
              max += list[i].main.temp_max;
              num += 1;
            } else {
              other.push({min: min / num, max: max/num, icon: list[i - 1].weather[0].icon, day});
              min = list[i].main.temp_min;
              max = list[i].main.temp_max;
              num = 1;
            }
            day = newDay;
            i++;
          }
          resolve(other);
        })
        .catch(error => {
          console.log("[error]", error.response.data);
          reject(error.response.data);
        })
    );
  }

  /**
   * To Fetch data for that today's date
   * @param cityName
   * @returns Promise<object>
   */
  public getTodayWeather(cityName: string): Promise<object> {
    return new Promise((resolve, reject) => {
      this.http.get('weather', { params: { ...this.params, q: cityName } })
        .then(response => {
          if (response.data.cod === 200) {
            resolve({
              today: {
                date: dayjs().format('ddd D, MMM, YYYY'),
                wind: response.data.wind.speed,
                sunrise: dayjs(response.data.sys.sunrise).format('hh:mm') + " AM",
                sunset: dayjs(response.data.sys.sunset).format('hh:mm') + " PM",
                ...response.data.weather[0],
                ...response.data.main,
              },
              city: response.data.name,
              country: response.data.sys.country,
            });
          }
        })
        .catch(error => {
          console.log("[error]", error.response.data);
          reject(error.response.data);
        })
    });
  }
}

export default Service;