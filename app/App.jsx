import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './component/welcome pages/WelcomePage'; // Welcome screen
import LoginScreen from './component/welcome pages/LoginScreen';
import SignUpScreen from './component/welcome pages/SignupScreen';
import i18n from './i18n';
import TabNavigator from './(tabs)/Tabnavigator';
import ClientInfo from './component/welcome pages/Clientinfo/ClientInfo';
import Profile from './component/profile/Profile';
import { Provider } from 'react-redux';
import Players from './(tabs)/Players';
import ShareProfile from './component/profile/ShareProfile';
import Settings from './component/profile/Settings/Settings';
import Reviews from './component/profile/profileTabs/Reviews';
import ProfileViewers from './component/profile/menutab/ProfileViewers';
import LangChanger from './component/LangChanger';
import VerifyAccount from './component/profile/Settings/VerifyAccount';
import ChangePassword from './component/profile/Settings/ChangePassword';
import {store} from './store/store';
import ContactUs from './component/profile/Settings/ContactUs';
import PrivacyPolicy from './component/profile/Settings/PrivacyPolicy';
import TermConditions from './component/profile/Settings/TermsConditions';
import DeleteAccount from './component/profile/Settings/DeleteAccount';
import Activity from './(tabs)/Activity';
import EditProfile from './component/profile/menutab/editprofile/EditProfile';
// Create navigators
const Stack = createNativeStackNavigator();


// Main App Navigation
export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
         {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClientInfo" component={ClientInfo} options={{headerShown: false}} />
        {/* Main App Tabs */}
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="Players" component={Players} />
       <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='ShareProfile' component={ShareProfile} options={{headerShown: false}} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Reviews' component={Reviews} />
        <Stack.Screen name='ProfileViewers' component={ProfileViewers} />
        <Stack.Screen name='LangChanger' component={LangChanger} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='ContactUs' component={ContactUs} />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        <Stack.Screen name='TermsConditions' component={TermConditions} />
        <Stack.Screen name='DeleteAccount' component={DeleteAccount} />
        <Stack.Screen name='Activity' component={Activity} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
