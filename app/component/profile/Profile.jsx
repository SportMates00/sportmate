import { View, StyleSheet, ScrollView, Platform, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './profileTabs/ProfileDetails';
import ProfileTopInfo from './profileTopInfo/ProfileTopInfo';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectCurrentUser } from '@/src/store/selectors';
import { usersSelectors } from '@/src/store/usersSlice';

const Profile = () => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const route = useRoute();
  const navigation = useNavigation();

  // 🔐 logged-in user from Redux
  const loggedUser = useSelector(selectCurrentUser);

  // 🧑‍🤝‍🧑 users selector from usersSlice
  const selectUserById = usersSelectors.selectById;

  // 🎯 id when navigating from GameDetails
  const playerId = route.params?.playerId;

  // 👤 resolve which profile we show
  const userToShow = useSelector(state =>
    playerId ? selectUserById(state, playerId) : loggedUser
  );

  // 🛡 safety guard
  if (!userToShow) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>User not found</Text>
      </View>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Profile',
      headerShadowVisible: false,
      headerBackButtonDisplayMode: 'minimal',
      headerBackTitleVisible: false,
      headerBackTitle: '',

      headerRight: () => <ProfileHeader />,

      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },

      headerTitleStyle: {
        color: theme.colors.text,
      },

      headerTintColor: theme.colors.text,

      headerLeftContainerStyle: { paddingLeft: 16 },
      headerRightContainerStyle: { paddingRight: 16 },
    });
  }, [navigation, theme]);

  return (
    <View style={styles.container}>
      <ProfileTopInfo loggedUser={userToShow} />
      <ProfileDetails loggedUser={userToShow} />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Profile;