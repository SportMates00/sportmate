import PlayersScreen from './Players'; // Home tab
import ActivityScreen from './Activity'; // Explore tab
import GamesScreen from './Games'; // Games tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InboxScreen from './Inbox';
import ProfileButton from '../component/profile/Profile';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <> 
    <Tab.Navigator screenOptions={{
    headerShown: true,
    headerRight: () => (
      <ProfileButton onPress={() => console.log('Profile tapped!')} />
    ),
  }}>
      <Tab.Screen name="Games" component={GamesScreen} options={{headerShown: true}} />
      <Tab.Screen name="Players" component={PlayersScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
    </Tab.Navigator>
    </>
  );
}

export default TabNavigator;