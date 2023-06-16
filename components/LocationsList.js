import React from "react";
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
  return (
    <ScrollView>
      {locations.map((location, idx) => (
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={async () => {
            await onSelectLocation(location);
            closeModal();
          }}
          key={idx}
        >
          <StyledText
            text={location.description}
            style={{ textAlign: "center" }}
          />
          {locations.length !== idx + 1 && <View style={styles.divider} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    marginVertical: 10,
    backgroundColor: GeneralColors.backgroundLight,
  },
});
