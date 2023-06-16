import React from "react";
import { ActivityIndicator, View } from "react-native";
//project imports
import { TextColors } from "styles/palette";

export default function PageLoader() {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={TextColors.main} />
    </View>
  );
}
