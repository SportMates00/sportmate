import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useLayoutEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './profileTabs/ProfileDetails';
import ProfileTopInfo from './profileTopInfo/ProfileTopInfo';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const Profile = () => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const loggedUser = useSelector((state) => state.user);
  const navigation = useNavigation();
  const {t} = useTranslation()
useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: true,
    headerTitle: t('profileTitle'),
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
    headerBackTitleVisible: false,
    headerBackTitle: "",

    headerRight: () => <ProfileHeader />,

    // Header background
    headerStyle: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },

    // ✅ TITLE COLOR
    headerTitleStyle: {
      color: theme.colors.text,
    },

    // ✅ Back arrow & icons color
    headerTintColor: theme.colors.text,
  });
}, [navigation, theme]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProfileTopInfo loggedUser={loggedUser} />
        <ProfileDetails loggedUser={loggedUser} />
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    
  },
  scrollView: {
    paddingTop: theme.spacing.large,  // Ensure content doesn't go behind the header
  },
});

export default Profile;
