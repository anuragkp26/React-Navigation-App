import { View, Text, Switch, StyleSheet, Pressable } from "react-native";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../store/ThemeContext";
import { useTheme } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function SettingsScreen() {
  const { colors } = useTheme();

  const themeContext = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["55%", '90%'], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef?.current?.snapToIndex(0);
  }, []);

  useLayoutEffect(() => {
    setIsEnabled(themeContext.isDarkTheme);
  }, []);

  const themeHandler = (switchState) => {
    setIsEnabled(switchState);
    themeContext.setAppTheme(switchState);
  };

  return (
    <View style={{ paddingHorizontal: 18, flex: 1 ,}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: colors.text }}>Dark Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={isEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => themeHandler(!isEnabled)}
          value={isEnabled}
        />
      </View>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => handleSnapPress(1)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={() => {}}
        enablePanDownToClose={true}
        backgroundStyle={{ borderRadius: 50}}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
