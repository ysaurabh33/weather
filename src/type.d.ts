interface Weather {
  min: number;
  max: number;
  day: string;
  icon: string;
}

type TemperatureUnit = 'C' | 'F';

type WeatherState = {
  others: Weather[] | null;
  today: { [key: string]: any } | null;
  city: string;
  country: string;
  error: string | null;
}

type WeatherAction = {
  type: string;
  data: any;
}

type DispatchType = (args: WeatherAction) => WeatherAction;