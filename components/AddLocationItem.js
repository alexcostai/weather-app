import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//project imports
import ConfirmModal from "./ConfirmModal";
import { TextColors } from "styles/palette";
import { setLocations } from "helpers/utils";
import { setLocations as setLocationsAction } from "store/slices/weather-slice";

export default function AddLocationItem({ location, isUserLocation }) {
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.weather);
  const [confirmModalState, setConfirmModalState] = useState(false);

  const onConfirmModal = () => {
    const newLocations = locations.filter(
      (e) => e.description !== location.description
    );
    setLocations(newLocations);
    dispatch(setLocationsAction(newLocations));
    setConfirmModalState(false);
  };

  return (
    <>
      <View style={styles.searchUbicationItem}>
        <Text style={{ fontSize: 15 }}>{location.description}</Text>
        {!isUserLocation && (
          <TouchableOpacity
            onPress={() => {
              setConfirmModalState(true);
            }}
          >
            <MaterialIcons
              name={"delete"}
              size={24}
              color={TextColors.mainColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <ConfirmModal
        text={`¿Estás seguro que querés eliminar la ubicación "${location.description}"?`}
        stateModal={confirmModalState}
        setStateModal={setConfirmModalState}
        onConfirmModal={onConfirmModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchUbicationItem: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
