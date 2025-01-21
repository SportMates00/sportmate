import PlayersScreen from './Players'; // Home tab
import ActivityScreen from './Activity'; // Explore tab
import GamesScreen from './Games'; // Games tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InboxScreen from './Inbox';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Players" component={PlayersScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;