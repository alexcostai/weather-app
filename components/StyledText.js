import React from "react";
import { StyleSheet, Text } from "react-native";
//project imports
import { TextColors } from "styles/palette";

export default function StyledText({
  text,
  style,
  bold = false,
  numberOfLines,
}) {
  const newStyle = {
    ...style,
    fontFamily: bold ? "Geologica-Bold" : "Geologica-Regular",
  };
  return (
    <Text numberOfLines={numberOfLines} style={{ ...styles.text, ...newStyle }}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: TextColors.main,
  },
});
