import PlayersScreen from './Players';
import ActivityScreen from './Activity';
import GamesScreen from './Games/Games';
import InboxScreen from './Inbox/Inbox';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileIcon from '../component/profile/ProfileIcon';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,

        // 🔴 THIS CONTROLS THE BOTTOM TAB BAR
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#ddd',

        headerRight: () => (
          <ProfileIcon onPress={() => navigation.navigate('Profile')} />
        ),
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: theme.fonts.family,
        },
      }}
    >
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{ title: t('TabGames') }}
      />
      <Tab.Screen
        name="Players"
        component={PlayersScreen}
        options={{ title: t('TabPlayers') }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: t('TabActivity') }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{ title: t('TabInbox') }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
