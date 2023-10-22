import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";
import ThemeContextProvider, { IS_DARK_THEME, ThemeContext } from "./store/ThemeContext";

import * as SplashScreen from "expo-splash-screen";
import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Root() {
  const [isInitLoading, setInitLoading] = useState(true);
  const themeContext = useContext(ThemeContext);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    const getTheme = async () => {
      console.log("getTheme: ");
      try {
        const value = await AsyncStorage.getItem(IS_DARK_THEME);
        console.log("getTheme value: ", value);
        if (value !== null) {
          themeContext.setAppTheme(value === "true" ? true : false);
          setInitLoading(false);
        } else {
          themeContext.setAppTheme(false);
          setInitLoading(false);
        }
      } catch (error) {
        console.log("Error retrieving value: ", error);
      }
    };

    getTheme();
  }, []);

  // if(isInitLoading){
  //   return <AppLoading />
  // }

  const onLayoutRootView = useCallback(async () => {
    if (!isInitLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isInitLoading]);

  if (isInitLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigation />
    </View>
  );
}

export default function App() {
  console.log("============================= ");
  return (
    <>
      <StatusBar style="auto" />
      <ThemeContextProvider>
        <Root />
      </ThemeContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-gesture-handler react-native-reanimated react-native-pager-view
*/
