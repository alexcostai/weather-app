import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
//poject imports
import useWeekDays from "hooks/useWeekDays";
import StyledText from "components/StyledText";
import PageLoader from "components/PageLoader";
import { getWeatherImage } from "helpers/utils";
import WeatherDaysList from "components/WeatherDaysList";
import WeatherDataIcons from "components/WeatherDataIcons";
import { GeneralColors, TextColors } from "styles/palette";
import HoursWeatherList from "components/HoursWeatherList";

export default function WeekDays() {
  const [isLoading, daysForecast] = useWeekDays();
  return isLoading ? (
    <PageLoader />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tomorrowBox}>
        <View style={styles.tomorrowContainer}>
          <Image
            source={getWeatherImage(daysForecast.condition.icon)}
            resizeMode="contain"
            style={styles.weatherImg}
          />
          <View>
            <StyledText text="Mañana" bold />
            <View style={styles.temperatureContainer}>
              <StyledText
                text={`${daysForecast.max_temperature}º`}
                style={{
                  fontSize: 35,
                  color: TextColors.mainColor,
                }}
                bold
              />
              <StyledText
                text={`${daysForecast.min_temperature}º`}
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  color: TextColors.main,
                }}
              />
            </View>
            <StyledText
              text={
                daysForecast.condition[daysForecast.isDay ? "day" : "night"]
              }
              style={{
                fontSize: 12,
                color: TextColors.light,
              }}
            />
          </View>
        </View>
        <HoursWeatherList
          forHours={daysForecast.days[0].forHours}
          hourContainerStyle={{ width: "auto" }}
        />
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <WeatherDataIcons forecast={daysForecast.days[0]} />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <WeatherDaysList list={daysForecast.days} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: GeneralColors.background,
  },
  tomorrowBox: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: GeneralColors.backgroundLight,
  },
  tomorrowContainer: {
    width: "100%",
    display: "flex",
    marginBottom: 25,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  weatherImg: {
    height: 96,
    width: 96,
  },
  temperatureContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
});
