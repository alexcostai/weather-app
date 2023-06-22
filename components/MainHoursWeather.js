import React from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
//project imports
import StyledText from "components/StyledText";
import HoursWeatherList from "./HoursWeatherList";
import { GeneralColors, TextColors } from "styles/palette";

export default function MainHoursWeather({ hours, actualTime, coords }) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.nextDaysContainer}>
        <StyledText text="Hoy" />
        <TouchableOpacity
          style={styles.nextDaysButton}
          onPress={() => {
            const { latitude, longitude } = coords;
            router.push({
              pathname: "/weekdays",
              params: { latitude, longitude },
            });
          }}
        >
          <StyledText text="Próximos 3 días" />
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={24}
            color={TextColors.main}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <HoursWeatherList hours={hours} actualTime={actualTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  nextDaysContainer: {
    display: "flex",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  nextDaysButton: {
    display: "flex",
    flexDirection: "row",
    textAlignVertical: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    borderRadius: 10,
    backgroundColor: GeneralColors.backgroundMainColor,
  },
});
