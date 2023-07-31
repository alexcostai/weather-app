import axios from "axios";
import { API_KEY } from "@env";

const http = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const addApiKey = (data) => {
  return `${data}&key=${API_KEY}`;
};

const getDayForecast = (coords) => {
  return http.get(
    `/forecast.json?${addApiKey(
      `q=${coords.latitude},${coords.longitude}&days=1`
    )}`
  );
};

const getWeekdaysForecast = (coords) => {
  return http.get(
    `/forecast.json?${addApiKey(
      `q=${coords.latitude},${coords.longitude}&days=3`
    )}`
  );
};

export default { getDayForecast, getWeekdaysForecast };
