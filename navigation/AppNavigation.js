import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import FeedScreen from "../screens/tabs/FeedScreen";
import NotificationsScreen from "../screens/tabs/NotificationsScreen";
import SettingsScreen from "../screens/tabs/SettingsScreen";
import TweetDetailScreen from "../screens/main/TweetDetailScreen";
import PaymentsScreen from "../screens/drawer/PaymentsScreen";
import FollowersScreen from "../screens/tabs/top/FollowersScreen";
import { Image, Pressable, useColorScheme } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import { StatusBar } from "expo-status-bar";
import TrendingScreen from "../screens/tabs/top/TrendingScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createMaterialTopTabNavigator();

const MainGroup = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TweetDetail"
        component={TweetDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "Tweet Details",
        }}
      />
    </Stack.Navigator>
  );
};

const TopTabGroup = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: colors.primary,//"#1DA1F2",
        },
      }}
    >
      <Tabs.Screen name="Feed" component={FeedScreen} />
      <Tabs.Screen name="Followers" component={FollowersScreen} />
      <Tabs.Screen name="Trending" component={TrendingScreen} />
    </Tabs.Navigator>
  );
};

const BottomTabView = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Tweets") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "ios-settings-sharp";
          } else if (route.name === "Notifications") {
            iconName = focused ? "ios-notifications" : "notifications-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, //"#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen
        name="Tweets"
        component={TopTabGroup}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../assets/beto.jpeg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginLeft: 15,
                }}
              />
            </Pressable>
          ),
          tabBarLabel: "Home",
        }}
      />
      <BottomTab.Screen name="Notifications" component={NotificationsScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
};

const DrawerGroup = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={MainGroup}
        options={{ drawerLabel: "Home", headerShown: false }}
      />
      <Drawer.Screen name="Payment" component={PaymentsScreen} />
    </Drawer.Navigator>
  );
};

export default function AppNavigation() {
  const themeContext = useContext(ThemeContext);

  const isDark = themeContext.isDarkTheme;

  //console.log("Local theme : ", isDark);
  const theme = isDark ? MyDarkTheme : MyTheme;
  //console.log("App theme : ", theme);

  return (
    <>
      <StatusBar style={ isDark ? "light" : 'dark'} />
      <NavigationContainer theme={theme}> 
        <DrawerGroup />
      </NavigationContainer>
    </>
  );
}

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
    iconColor: "rgb(0, 0, 0)",
    iconColor2: "black",
  },
};

const MyDarkTheme = {
  dark: true,
  colors: {
    primary: "rgb(47, 147, 255)",
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(255, 255, 255)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
    iconColor: "rgb(255, 255, 255)",
    iconColor2: "gray",
  },
};
