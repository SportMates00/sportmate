// App.js
import React, { useMemo } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { ThemeProvider, useTheme } from "../src/theme/themeContext";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// ✅ make sure i18n is initialized ONCE at app entry
import "./i18n";

/* -------- SCREENS -------- */
import WelcomeScreen from "./component/welcome pages/WelcomePage";
import LoginScreen from "./component/welcome pages/LoginScreen";
import SignUpScreen from "./component/welcome pages/SignupScreen";
import QSport from "./component/welcome pages/Clientinfo/QSport";
import QLevel from "./component/welcome pages/Clientinfo/QLevel";
import QSchedule from "./component/welcome pages/Clientinfo/QSchedule";

import TabNavigator from "./(tabs)/Tabnavigator";
import Players from "./(tabs)/Players";
import Profile from "./component/profile/Profile";
import FriendsList from "./component/profile/profileTopInfo/FriendsList";
import ShareProfile from "./component/profile/ShareProfile";
import ShareLink from "./component/profile/ShareLink";
import EditProfile from "./component/profile/menutab/editprofile/EditProfile";
import Settings from "./component/profile/menutab/Settings/Settings";
import VerifyAccount from "./component/profile/menutab/Settings/top settings/VerifyAccount";
import ChangePassword from "./component/profile/menutab/Settings/top settings/ChangePassword";
import ContactUs from "./component/profile/menutab/Settings/ContactUs";
import PrivacyPolicy from "./component/profile/menutab/Settings/PrivacyPolicy";
import TermConditions from "./component/profile/menutab/Settings/TermsConditions";
import DeleteAccount from "./component/profile/menutab/Settings/DeleteAccount";
import Reviews from "./component/profile/profileTabs/Reviews";
import ProfileViewers from "./component/profile/menutab/ProfileViewers";
import LangChanger from "./component/LangChanger";
import Activity from "./(tabs)/Activity";
import ChatScreen from "./(tabs)/Inbox/ChatScreen";
import GameDetails from "./(tabs)/Games/GameDetails";
import CreateGameComponent from "./(tabs)/Games/CreateGame/CreateGameContainer";

const Stack = createStackNavigator();

/* ================= THEMED NAV ================= */
const ThemedNavigator = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const androidBottomPad = Platform.OS === "android" ? insets.bottom : 0;

  const commonOptions = useMemo(
    () => ({
      headerShown: true,
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,

      headerStyle: {
        backgroundColor: theme.colors.background,
      },

      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.family,
        fontWeight: "600",
        textAlign: 'center'
      },
            headerLeftContainerStyle: { paddingLeft: 16 },
            headerRightContainerStyle: { paddingRight: 16 },

      headerTintColor: theme.colors.text,
    }),
    [theme]
  );

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        ...commonOptions,

        // ✅ Global Android bottom safe space, but NOT on tabs screen
        cardStyle: {
          backgroundColor: theme.colors.background,
          paddingBottom: route.name === "HomeTabs" ? 0 : androidBottomPad,
        },
      })}
    >
      {/* AUTH */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen name="QSport" component={QSport} />
      <Stack.Screen name="QLevel" component={QLevel} />
      <Stack.Screen name="QSchedule" component={QSchedule} />

      {/* MAIN */}
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Players" component={Players} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="FriendsList" component={FriendsList} />
      <Stack.Screen
        name="ShareProfile"
        component={ShareProfile}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ShareLink"
        component={ShareLink}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen
        name="ProfileViewers"
        component={ProfileViewers}
        options={{ title: "Profile Viewers" }}
      />
      <Stack.Screen name="LangChanger" component={LangChanger} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermConditions} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="GameDetails"
        component={GameDetails}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="CreateGameComponent"
        component={CreateGameComponent}
        options={{ title: "Set up a match" }}
      />
    </Stack.Navigator>
  );
};

/* ================= ROOT ================= */
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <ThemedNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
