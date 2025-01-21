import PlayersScreen from './Players'; // Home tab
import ActivityScreen from './Activity'; // Explore tab
import GamesScreen from './Games'; // Games tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InboxScreen from './Inbox';
import ProfileIcon from '../component/profile/ProfileIcon';
import { useNavigation } from '@react-navigation/native';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();
  return (
    <> 
    <Tab.Navigator screenOptions={{
    headerShown: true,
    headerRight: () => (
      <ProfileIcon onPress={() => navigation.navigate('Profile')} />
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