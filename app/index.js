import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './component/WelcomePage'; // Welcome screen
import LoginScreen from './component/LoginScreen';
import SignUpScreen from './component/SignupScreen';
import TabNavigator from './(tabs)/tabnavigator';
import i18n from './i18n';
// Create navigators
const Stack = createNativeStackNavigator();


// Main App Navigation
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
