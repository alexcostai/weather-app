import React, { useState } from "react";
import { useRouter } from "expo-router";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { Snackbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
//project imports
import { storageLocation } from "helpers/utils";
import { setLocations } from "store/slices/weather-slice";
import { GeneralColors, TextColors } from "styles/palette";

export default function AddLocation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSnackBar, setShowSnackBar] = useState(false);
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
            if (locations.some((e) => e.description === data.description)) {
              setShowSnackBar(true);
            } else {
              const newLocations = await storageLocation(
                { latitude, longitude },
                data.description
              );
              dispatch(setLocations(newLocations));
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
      <View style={styles.searchUbicationContainer}>
        <Text style={styles.searchUbicationTxt}>
          ¡Busca la ubicacion que quieras!
        </Text>
      </View>
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        duration={2000}
        style={{
          backgroundColor: GeneralColors.backgroundMainColor,
        }}
      >
        <Text style={{ color: TextColors.main }}>
          Ya añadiste esa ubicación!
        </Text>
      </Snackbar>
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
  searchUbicationContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchUbicationTxt: {
    fontSize: 20,
    textAlign: "center",
    color: TextColors.mainColor,
  },
});
