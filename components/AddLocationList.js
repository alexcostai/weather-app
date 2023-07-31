import { ScrollView, StyleSheet, View } from "react-native";
//project imports
import { GeneralColors } from "styles/palette";
import AddLocationItem from "./AddLocationItem";

export default function AddLocationList({ locations }) {
  return (
    <ScrollView style={styles.searchUbicationContainer}>
      {locations.map((location, idx) => (
        <View key={idx}>
          <View style={styles.divider} />
          <AddLocationItem
            location={location}
            isUserLocation={idx === 0}
            key={idx}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchUbicationContainer: {
    bottom: 0,
    zIndex: -1,
    width: "100%",
    display: "flex",
    position: "absolute",
  },
  divider: {
    height: 2,
    width: "100%",
    marginVertical: 5,
    backgroundColor: GeneralColors.backgroundLight,
  },
});
