import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './component/welcome pages/WelcomePage';
import LoginScreen from './component/welcome pages/LoginScreen';
import SignUpScreen from './component/welcome pages/SignupScreen';
import i18n from './i18n';
import TabNavigator from './(tabs)/Tabnavigator';
import Profile from './component/profile/Profile';
import { Provider } from 'react-redux';
import Players from './(tabs)/Players';
import ShareProfile from './component/profile/ShareProfile';
import Reviews from './component/profile/profileTabs/Reviews';
import ProfileViewers from './component/profile/menutab/ProfileViewers';
import LangChanger from './component/LangChanger';
import { store } from '../src/store/store';
import Activity from './(tabs)/Activity';
import EditProfile from './component/profile/menutab/editprofile/EditProfile';
import Settings from './component/profile/menutab/Settings/Settings';
import VerifyAccount from './component/profile/menutab/Settings/top settings/VerifyAccount';
import ChangePassword from './component/profile/menutab/Settings/top settings/ChangePassword';
import ContactUs from './component/profile/menutab/Settings/ContactUs';
import PrivacyPolicy from './component/profile/menutab/Settings/PrivacyPolicy';
import TermConditions from './component/profile/menutab/Settings/TermsConditions';
import DeleteAccount from './component/profile/menutab/Settings/DeleteAccount';
import { ThemeProvider } from '../src/theme/themeContext';
import ChatScreen from './(tabs)/Inbox/ChatScreen';
import QSport from './component/welcome pages/Clientinfo/QSport';
import QLevel from './component/welcome pages/Clientinfo/QLevel';
import QSchedule from './component/welcome pages/Clientinfo/QSchedule';
import {createStackNavigator } from '@react-navigation/stack'
import ShareLink from './component/profile/ShareLink';
// ✅ Create JS Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShadowVisible: false,      // removes shadow in JS stack
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTitleAlign: 'center',
            }}
          >
            {/* Auth Screens */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: '' }} />
            <Stack.Screen name="QSport" component={QSport} />
            <Stack.Screen name="QLevel" component={QLevel} />
            <Stack.Screen name="QSchedule" component={QSchedule} />

            {/* Main App */}
            <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Players" component={Players} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="ShareProfile" component={ShareProfile} options={{ headerShown: true, title: '' }} />
            <Stack.Screen name="ShareLink" component={ShareLink} options={{ headerShown: true, title: '' }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="ProfileViewers" component={ProfileViewers} options={{ title: 'Profile Viewers' }} />
            <Stack.Screen name="LangChanger" component={LangChanger} />
            <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsConditions" component={TermConditions} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
            <Stack.Screen name="Activity" component={Activity} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
