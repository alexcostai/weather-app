import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//project imports
import { TextColors } from "styles/palette";
import StyledText from "components/StyledText";

const iconsDataList = [
  { icon: "weather-windy", data: "wind_kph", label: "Viento", suffix: "K/h" },
  {
    icon: "weather-cloudy",
    data: "chance_of_rain",
    label: "Precipitación",
    suffix: "%",
  },
  { icon: "water", data: "humidity", label: "Humedad", suffix: "%" },
];

const DataIcon = ({ icon, data, label }) => {
  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color={TextColors.main} />
      <StyledText text={data} bold style={{ fontSize: 12 }} />
      <StyledText
        text={label}
        style={{ fontSize: 12, color: TextColors.light }}
      />
    </View>
  );
};

export default function WeatherDataIcons({ forecast }) {
  return (
    <View style={styles.container}>
      {iconsDataList.map((icon, idx) => (
        <DataIcon
          data={`${forecast[icon.data]}${icon.suffix || ""}`}
          label={icon.label}
          icon={icon.icon}
          key={idx}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
});
