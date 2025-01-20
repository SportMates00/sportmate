import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './component/WelcomePage'; // Welcome screen
import LoginScreen from './component/LoginScreen';
import SignUpScreen from './component/SignupScreen';
import i18n from './i18n';
import TabNavigator from './(tabs)/Tabnavigator';
import LangChanger from './component/LangChanger';
import { View } from 'react-native';
// Create navigators
const Stack = createNativeStackNavigator();


// Main App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
         {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        {/* Main App Tabs */}
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
