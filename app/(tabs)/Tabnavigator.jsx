import HomeScreen from './Home'; // Home tab
import ActivityScreen from './Activity'; // Explore tab
import GamesScreen from './Games'; // Games tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Games" component={GamesScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;