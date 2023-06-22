import React from "react";
import { View } from "react-native";
//project imports
import StyledText from "components/StyledText";
import ScreensLayout from "components/ScreensLayout";

export default function WeekDaysLayout() {
  return (
    <ScreensLayout
      MiddleComponent={() => (
        <View>
          <StyledText text="Próximos 3 días" />
        </View>
      )}
    />
  );
}
