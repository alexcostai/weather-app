import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
//project imports
import store from "store/index";

const CURRENT_STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export default function AppLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Slot />
          <ExpoStatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? CURRENT_STATUS_BAR_HEIGHT : 0,
  },
});
