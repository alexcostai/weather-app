import React from "react";
import { Slot, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
//project imports
import { TextColors } from "styles/palette";

export default function ScreensLayout({
  MiddleComponent,
  RightComponent,
  LeftComponent,
}) {
  const router = useRouter();
  return (
    <>
      <View style={styles.header}>
        <View>
          {LeftComponent ? (
            <LeftComponent />
          ) : (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                router.back();
              }}
            >
              <MaterialIcons
                name={"keyboard-arrow-left"}
                size={28}
                color={TextColors.main}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.middleComponent}>
          <MiddleComponent />
        </View>
        <View>{RightComponent ? <RightComponent /> : null}</View>
      </View>
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  middleComponent: {
    width: "100%",
    marginLeft: 5,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    zIndex: -1,
  },
});
