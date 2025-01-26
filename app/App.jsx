import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './component/welcome pages/WelcomePage'; // Welcome screen
import LoginScreen from './component/welcome pages/LoginScreen';
import SignUpScreen from './component/welcome pages/SignupScreen';
import i18n from './i18n';
import TabNavigator from './(tabs)/Tabnavigator';
import ClientInfo from './component/welcome pages/Clientinfo/ClientInfo';
import Profile from './component/profile/Profile';
import { UserProvider } from './UserProvider';
import Players from './(tabs)/Players';
import ShareProfile from './component/profile/ShareProfile';
import Settings from './component/profile/Settings/Settings';
import EditProfile from './component/profile/editprofile/EditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reviews from './component/profile/profileTabs/Reviews';
import ProfileViewers from './component/profile/ProfileViewers';
import SelectLanguage from './component/profile/Settings/SelectLanguage';
import LangChanger from './component/LangChanger';
import VerifyAccount from './component/profile/Settings/VerifyAccount';
import ChangePassword from './component/profile/Settings/ChangePassword';
// Create navigators
const Stack = createNativeStackNavigator();


// Main App Navigation
export default function App() {

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [loggedUser, setLoggedUser] = useState(
    {firstName:'', lastName: '', email:'', password:'', profileInfo: {
      sport: '',
      level: '',
      location:'',
      age:'',
      gender:'',
      aboutMe:'',
      sportsList:[{sport:'',level:''}],
      reviews:'',
      activity:'',
      availibility: {
          Mon: { Morning: false, Afternoon: true, Evening: false },
          Tue: { Morning: false, Afternoon: false, Evening: false },
          Wed: { Morning: false, Afternoon: false, Evening: false },
          Thu: { Morning: true, Afternoon: false, Evening: false },
          Fri: { Morning: false, Afternoon: false, Evening: false },
          Sat: { Morning: false, Afternoon: false, Evening: false },
          Sun: { Morning: false, Afternoon: false, Evening: false },
      },
    },}
  );


  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('loggedUser');
        console.log('FOUND IT', savedUser)
        if (savedUser) {
          setLoggedUser(JSON.parse(savedUser));
          const calculateCompletion = () => {
            let percentage = 0;
            if (loggedUser.firstName) percentage += 0;
            if (loggedUser.lastName) percentage += 25;
            if (loggedUser.profileInfo.sport) percentage += 25;
            if (loggedUser.profileInfo.level) percentage += 25;
            setCompletionPercentage(percentage);
          }
          calculateCompletion();
        }
      } catch (e) {
        console.error('Failed to load user info:', e);
      }
    };
    loadUserInfo();
  },[loggedUser.firstName,loggedUser.email])

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
         {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClientInfo" component={ClientInfo} options={{headerShown: false}} />
        {/* Main App Tabs */}
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="Players" component={Players} />
       <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
        >
          {(props) => (
            <Profile
              {...props}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              completionPercentage={completionPercentage}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='ShareProfile' component={ShareProfile} options={{headerShown: false}} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Reviews' component={Reviews} />
        <Stack.Screen name='ProfileViewers' component={ProfileViewers} />
        <Stack.Screen name='SelectLanguage' component={SelectLanguage} />
        <Stack.Screen name='LangChanger' component={LangChanger} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
