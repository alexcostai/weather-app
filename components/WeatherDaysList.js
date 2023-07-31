import React from "react";
import moment from "moment";
import { View, Image, StyleSheet } from "react-native";
//project imports
import StyledText from "./StyledText";
import { GeneralColors, TextColors } from "styles/palette";
import { getWeatherImage, toFirstUpperCase } from "helpers/utils";

export default function WeatherDaysList({ list }) {
  return list.map((day, idx) => (
    <View key={idx}>
      <View style={styles.dayContainter}>
        <StyledText
          text={toFirstUpperCase(moment(day.date).format("dddd"))}
          style={styles.dayTxt}
        />
        <View style={styles.weatherContainer}>
          <Image
            source={getWeatherImage(day.condition.icon)}
            style={styles.dayWeatherImg}
          />
          <StyledText
            text={day.condition["day"]}
            numberOfLines={1}
            style={styles.weatherTxt}
          />
        </View>
        <View style={styles.temperatureContainer}>
          <StyledText
            text={`${day.max_temperature}º`}
            style={{
              fontSize: 14,
              color: TextColors.mainColor,
            }}
            bold
          />
          <StyledText
            text={`${day.min_temperature}º`}
            style={{
              fontSize: 12,
              color: TextColors.light,
              marginLeft: 5,
            }}
          />
        </View>
      </View>
      {list.length !== idx + 1 ? <View style={styles.divider} /> : null}
    </View>
  ));
}

const styles = StyleSheet.create({
  dayContainter: {
    paddingVertical: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: GeneralColors.backgroundLight,
  },
  dayWeatherImg: {
    height: 24,
    width: 24,
  },
  temperatureContainer: {
    flex: 1,
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  weatherContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  weatherTxt: {
    fontSize: 12,
    width: "100%",
    color: TextColors.light,
    marginLeft: 5,
  },
  dayTxt: {
    flex: 1,
    fontSize: 12,
    color: TextColors.light,
  },
});
