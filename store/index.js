import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weather-slice";

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
