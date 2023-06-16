import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import "moment/locale/es";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
//project imports
import useApp from "hooks/useApp";
import StyledText from "components/StyledText";
import PageLoader from "components/PageLoader";
import { getWeatherImage } from "helpers/utils";
import { GeneralColors, TextColors } from "styles/palette";
import WeatherDataIcons from "components/WeatherDataIcons";
import MainHoursWeather from "components/MainHoursWeather";
import LocationsBottomSheet from "components/LocationsBottomSheet";

moment.locale("es");

export default function App() {
  const [
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
  ] = useApp();

  if (!fontsLoaded) {
    return null;
  }

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      <ScrollView style={styles.container} onLayout={handleOnLayout}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.ubicationBtn}
            onPress={() => {
              setBottomSheetState(true);
            }}
          >
            <StyledText
              text={selectedLocation.description}
              bold
              style={styles.ubicationText}
              numberOfLines={1}
            />
            <MaterialIcons
              name={"keyboard-arrow-down"}
              size={24}
              color={TextColors.mainColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <StyledText text="Hoy" />
          <StyledText
            text={moment(dayForecast.date).format("dddd, D [de] MMMM")}
            style={{ color: TextColors.light, fontSize: 12 }}
          />
          <View style={styles.boxContainer}>
            <Image
              source={getWeatherImage(dayForecast.condition.icon)}
              resizeMode="contain"
              style={styles.weatherImg}
            />
            <StyledText
              text={dayForecast.condition[dayForecast.isDay ? "day" : "night"]}
              style={{ textAlign: "center" }}
            />
            <StyledText
              text={`${dayForecast.temperature}º`}
              style={{
                fontSize: 45,
                marginBottom: 10,
                color: TextColors.mainColor,
              }}
              bold
            />
            <WeatherDataIcons forecast={dayForecast} />
          </View>
        </View>
        <MainHoursWeather
          coords={selectedLocation}
          hours={dayForecast.forHours.hours}
          actualTime={dayForecast.localtime}
        />
      </ScrollView>
      <LocationsBottomSheet
        state={bottomSheetState}
        setState={setBottomSheetState}
        locations={locations}
        onSelectLocation={(location) => {
          setSelectedLocation(location);
          getDayForecast(location);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GeneralColors.background,
  },
  header: {
    width: "100%",
    display: "flex",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  boxContainer: {
    padding: 30,
    marginTop: 15,
    width: "100%",
    display: "flex",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: GeneralColors.backgroundLight,
  },
  weatherImg: {
    height: 178,
    width: 178,
  },
  ubicationBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ubicationText: {
    color: TextColors.mainColor,
    width: 120,
  },
});
