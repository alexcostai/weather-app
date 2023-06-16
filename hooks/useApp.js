import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
//project imports
import { storageLocation } from "helpers/utils";
import WeatherService from "../services/WeatherService";
import { mappedForecast } from "helpers/mapped-response";
import GeologicaBoldFont from "assets/fonts/Geologica-Bold.ttf";
import GeologicaRegularFont from "assets/fonts/Geologica-Regular.ttf";

SplashScreen.preventAutoHideAsync();

const DEFAULT_COORDS = {
  latitude: "-34.599722222222",
  longitude: "-58.381944444444",
};

export default function useApp() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dayForecast, setDayForecast] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [bottomSheetState, setBottomSheetState] = useState(false);
  const [fontsLoaded] = useFonts({
    "Geologica-Bold": GeologicaBoldFont,
    "Geologica-Regular": GeologicaRegularFont,
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        console.log("Entro");
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("1");
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        console.log("2");
        const userCoords =
          status !== "granted"
            ? DEFAULT_COORDS
            : {
                latitude: coords.latitude,
                longitude: coords.longitude,
              };
        const storageLocations = await storageLocation(userCoords, null, true);
        console.log("3");
        setLocations(storageLocations);
        setSelectedLocation(storageLocations[0]);
        getDayForecast(userCoords);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentLocation();
  }, []);

  const getDayForecast = async (coords) => {
    if (!isLoading) setIsLoading(true);
    try {
      const { data } = await WeatherService.getDayForecast(coords);
      setDayForecast(mappedForecast(data, true));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    setSelectedLocation,
  ];
}
