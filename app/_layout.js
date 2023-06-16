import React from "react";
import { Slot } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

const CURRENT_STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export default function AppLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? CURRENT_STATUS_BAR_HEIGHT : 0,
  },
});
