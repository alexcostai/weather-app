import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
//project imports
import { CONDITION_LIST } from "constants/weather-service-constants";

const getWeatherImage = (image) => {
  const weatherImages = {
    rain: require("../assets/images/weather/rain.png"),
    rain2: require("../assets/images/weather/rain2.png"),
    rain3: require("../assets/images/weather/rain3.png"),
    snowCloud: require("../assets/images/weather/snow-cloud.png"),
    snowRain: require("../assets/images/weather/snow-rain.png"),
    snow: require("../assets/images/weather/snow.png"),
    sunCloud: require("../assets/images/weather/sun-cloud.png"),
    sunRain: require("../assets/images/weather/sun-rain.png"),
    sun: require("../assets/images/weather/sun.png"),
    thunderstormRain: require("../assets/images/weather/thunderstorm-rain.png"),
    thunderstormStorm: require("../assets/images/weather/thunderstorm.png"),
  };
  return weatherImages[image];
};

const getReponseConditionByCode = (code) => {
  return CONDITION_LIST.find((condition) => condition.code === code);
};

const toFirstUpperCase = (str) => {
  const slicedStr = str.slice(1);
  return str[0].toUpperCase() + slicedStr;
};

const storageLocation = async (
  coords,
  description = null,
  isUserLocation = false
) => {
  const location = coords;
  if (!description) {
    const { region, country } = (await Location.reverseGeocodeAsync(coords))[0];
    location.description = `${region}, ${country}`;
  } else {
    location.description = description;
  }
  let locations = await getLocations();
  if (locations) {
    isUserLocation ? (locations[0] = location) : locations.push(location);
  } else {
    locations = [location];
  }
  await AsyncStorage.setItem("locations", JSON.stringify(locations));
  return locations;
};

const getLocations = async () => {
  const locations = await AsyncStorage.getItem("locations");
  return locations ? JSON.parse(locations) : null;
};

export {
  getWeatherImage,
  getReponseConditionByCode,
  toFirstUpperCase,
  storageLocation,
  getLocations,
};
