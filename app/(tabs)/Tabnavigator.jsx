import PlayersScreen from './Players';
import Explore from './Explore/Explore';
import GamesScreen from './Games/Games';
import InboxScreen from './Inbox/Inbox';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileIcon from '../component/profile/ProfileIcon';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,

        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text, // better for dark/light
        tabBarInactiveBackgroundColor: "transparent",

        headerRight: () => (
          <ProfileIcon onPress={() => navigation.navigate('Profile')} />
        ),

        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowColor: 'transparent',
        },

        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: theme.fonts.family,

        },

        headerTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          title: t('TabGames'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Players"
        component={PlayersScreen}
        options={{
          title: t('TabPlayers'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          title: t('TabExplore'), // ✅ add this key
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          title: t('TabInbox'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
