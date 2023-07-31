import React from "react";
import { useRouter } from "expo-router";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//project imports
import { storageLocation } from "helpers/utils";
import AddLocationList from "components/AddLocationList";
import { GeneralColors, TextColors } from "styles/palette";
import { setLocations, setSelectedLocation } from "store/slices/weather-slice";

export default function AddLocation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.weather);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={styles.backBtn}
        >
          <MaterialIcons
            name={"keyboard-arrow-left"}
            size={24}
            color={TextColors.main}
          />
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          placeholder="Buscar ubicación..."
          onPress={async (data, details = null) => {
            const { lat: latitude, lng: longitude } =
              details?.geometry?.location;
            const searchedLocation = locations.find(
              (e) => e.description === data.description
            );
            if (searchedLocation) {
              dispatch(setSelectedLocation(searchedLocation));
              router.push("/");
            } else {
              const newLocations = await storageLocation(
                { latitude, longitude },
                data.description
              );
              dispatch(setLocations(newLocations));
              dispatch(
                setSelectedLocation(newLocations[newLocations.length - 1])
              );
              router.push("/");
            }
          }}
          styles={styles.googleAutocomplete}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
            type: "(cities)",
          }}
        />
      </View>
      <AddLocationList locations={locations} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GeneralColors.background,
  },
  header: {
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  backBtn: {
    top: 20,
    left: 5,
    position: "absolute",
    zIndex: 999,
  },
  googleAutocomplete: {
    separator: {
      height: 2,
      backgroundColor: GeneralColors.backgroundMainLightColor,
    },
    container: {
      paddingTop: 5,
    },
    poweredContainer: { display: "none" },
    textInput: {
      borderWidth: 2,
      borderRadius: 10,
      marginLeft: 30,
      borderColor: GeneralColors.backgroundMainLightColor,
    },
  },
});
