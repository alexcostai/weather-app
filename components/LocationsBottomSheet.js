import React from "react";
import { useRouter } from "expo-router";
import { BottomSheet } from "react-native-btr";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
//project imports
import StyledText from "./StyledText";
import LocationsList from "./LocationsList";
import { GeneralColors, TextColors } from "styles/palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LocationsBottomSheet({
  state,
  setState,
  locations,
  onSelectLocation,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const toggleBottomNavigationView = () => setState(false);
  return (
    <BottomSheet
      visible={state}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View
        style={{
          ...styles.container,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
        }}
      >
        <LocationsList
          locations={locations}
          onSelectLocation={onSelectLocation}
          closeModal={toggleBottomNavigationView}
        />
        <View style={styles.addUbicationContainer}>
          <TouchableOpacity
            style={styles.addUbicationBtn}
            onPress={() => {
              router.push("/add-location");
            }}
          >
            <StyledText
              style={styles.addUbicationTxt}
              text="Agregar Ubicación"
            />
            <MaterialIcons
              name={"add-circle"}
              size={20}
              color={TextColors.main}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    maxHeight: "60%",
    backgroundColor: GeneralColors.background,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  addUbicationContainer: {
    padding: 10,
    width: "100%",
  },
  addUbicationBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: GeneralColors.backgroundMainLightColor,
  },
  addUbicationTxt: {
    fontSize: 13,
    marginRight: 5,
    color: TextColors.main,
  },
});
