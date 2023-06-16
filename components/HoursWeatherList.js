import React from "react";
import moment from "moment";
import { View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//project imports
import StyledText from "./StyledText";
import { getWeatherImage } from "helpers/utils";
import { GeneralColors, TextColors } from "styles/palette";

export default function HoursWeatherList({ hours, actualTime }) {
  const actualHour = moment(actualTime).hour();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 5,
        backgroundColor: GeneralColors.backgroundMainLightColor,
      }}
    >
      {hours.map((hour, idx) => (
        <View
          style={{
            ...styles.hourContainer,
            backgroundColor:
              actualHour === moment(hour.time).hour()
                ? GeneralColors.backgroundMainColor
                : "",
            marginRight: hours.length !== idx + 1 ? 5 : 0,
          }}
          key={idx}
        >
          <StyledText
            text={`${hour.temperature}º`}
            bold
            style={{ fontSize: 16 }}
          />
          <Image
            source={getWeatherImage(hour.condition.icon)}
            resizeMode="contain"
            style={styles.weatherImg}
          />
          <StyledText
            text={moment(hour.time).format("HH:mm")}
            style={styles.hour}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  weatherImg: {
    width: 26,
    height: 26,
    marginVertical: 2,
  },
  hourContainer: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  hour: {
    fontSize: 14,
    color: TextColors.main,
  },
});
