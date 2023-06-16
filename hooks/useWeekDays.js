import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
//project imports
import WeatherService from "services/WeatherService";
import { mappedForecast } from "helpers/mapped-response";

export default function useWeekDays() {
  const coords = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [daysForecast, setDaysForecast] = useState(null);
  useEffect(() => {
    const getWeekdaysForecast = async () => {
      try {
        const { data } = await WeatherService.getWeekdaysForecast(coords);
        const forecast = mappedForecast(data, false);
        setDaysForecast(forecast);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getWeekdaysForecast();
  }, []);

  return [isLoading, daysForecast];
}
