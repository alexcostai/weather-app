import moment from "moment";
//project imports
import { getReponseConditionByCode } from "./utils";
import { IS_DAY } from "constants/weather-service-constants";

const getDayHours = (day) => {
  return day.hour.map((hour) => ({
    temperature: hour.temp_c,
    time: hour.time,
    condition: getReponseConditionByCode(hour.condition.code),
  }));
};

const mappedForecast = (data, isOneDay) => {
  const actualDay = data.forecast.forecastday[0];
  const mappedForecast = {
    location: `${data.location.region}, ${data.location.country}`,
    localtime: data.location.localtime,
    temperature: data.current.temp_c,
    humidity: data.current.humidity,
    wind_kph: data.current.wind_kph,
    chance_of_rain: actualDay.day.daily_chance_of_rain,
    condition: getReponseConditionByCode(data.current.condition.code),
    max_temperature: actualDay.day.maxtemp_c,
    min_temperature: actualDay.day.mintemp_c,
    isDay: data.current.is_day === IS_DAY,
  };
  if (isOneDay) {
    mappedForecast.forHours = {
      hours: getDayHours(actualDay),
      actualHour: moment(mappedForecast.localtime).hour(),
    };
  } else {
    mappedForecast.days = data.forecast.forecastday.slice(1).map((day) => ({
      max_temperature: day.day.maxtemp_c,
      min_temperature: day.day.mintemp_c,
      humidity: day.day.avghumidity,
      wind_kph: day.day.maxwind_kph,
      chance_of_rain: day.day.daily_chance_of_rain,
      date: day.date,
      condition: getReponseConditionByCode(day.day.condition.code),
      forHours: {
        hours: getDayHours(day),
      },
    }));
  }
  return mappedForecast;
};

export { mappedForecast };
