import HomeScreen from './home'; // Home tab
import ActivityScreen from './activity'; // Explore tab
import GamesScreen from './games'; // Games tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;