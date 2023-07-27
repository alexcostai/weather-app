import { useRef } from "react";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { SplashScreen } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
//project imports
import { storageLocation } from "helpers/utils";
import WeatherService from "../services/WeatherService";
import { mappedForecast } from "helpers/mapped-response";
import GeologicaBoldFont from "assets/fonts/Geologica-Bold.ttf";
import GeologicaRegularFont from "assets/fonts/Geologica-Regular.ttf";
import { WEATHER_HOURS_ITEM_WIDTH } from "constants/general-constants";
import { setLocations, setSelectedLocation } from "store/slices/weather-slice";

SplashScreen.preventAutoHideAsync();

const DEFAULT_COORDS = {
  latitude: "-34.599722222222",
  longitude: "-58.381944444444",
};

export default function useApp() {
  const dispatch = useDispatch();
  const hoursScrollViewRef = useRef(null);
  const { locations, selectedLocation } = useSelector((state) => state.weather);
  const [isLoading, setIsLoading] = useState(true);
  const [dayForecast, setDayForecast] = useState();
  const [bottomSheetState, setBottomSheetState] = useState(false);
  const [fontsLoaded] = useFonts({
    "Geologica-Bold": GeologicaBoldFont,
    "Geologica-Regular": GeologicaRegularFont,
  });

  const handleOnLayout = useCallback(
    async (actualHour) => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        hoursScrollViewRef.current?.scrollTo({
          x: WEATHER_HOURS_ITEM_WIDTH * actualHour,
          y: 0,
          animated: true,
        });
      }
    },
    [fontsLoaded]
  );

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        var userCoords = selectedLocation;
        if (!userCoords) {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
          }
          const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000,
          });
          userCoords =
            status !== "granted"
              ? DEFAULT_COORDS
              : {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                };
          const storageLocations = await storageLocation(
            userCoords,
            null,
            true
          );
          dispatch(setLocations(storageLocations));
          changeSelectedLocation(storageLocations[0]);
        }
        getDayForecast(userCoords);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentLocation();
  }, []);

  const changeSelectedLocation = (location) => {
    dispatch(setSelectedLocation(location));
  };

  const getDayForecast = async (coords) => {
    if (!isLoading) setIsLoading(true);
    try {
      const { data } = await WeatherService.getDayForecast(coords);
      setDayForecast(mappedForecast(data, true));
      setIsLoading(false);
    } catch (error) {
      console.log("Weather Service: ", error);
    }
  };

  return [
    fontsLoaded,
    handleOnLayout,
    isLoading,
    getDayForecast,
    dayForecast,
    locations,
    bottomSheetState,
    setBottomSheetState,
    selectedLocation,
    changeSelectedLocation,
    hoursScrollViewRef,
  ];
}
