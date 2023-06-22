import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, View } from "react-native";
//project imports
import StyledText from "./StyledText";
import { GeneralColors } from "styles/palette";

export default function LocationsList({
  locations,
  onSelectLocation,
  closeModal,
}) {
  const { selectedLocation } = useSelector((state) => state.weather);
  return (
    <ScrollView>
      {locations.map((location, idx) => (
        <View key={idx}>
          <TouchableOpacity
            style={{
              ...styles.locationContainer,
              backgroundColor:
                selectedLocation === location
                  ? GeneralColors.backgroundMainLightColor
                  : "transparent",
            }}
            onPress={async () => {
              await onSelectLocation(location);
              closeModal();
            }}
          >
            <StyledText
              text={location.description}
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    padding: 5,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlignVertical: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    marginVertical: 5,
    backgroundColor: GeneralColors.backgroundLight,
  },
});
