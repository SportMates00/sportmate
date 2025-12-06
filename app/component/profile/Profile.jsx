import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './profileTabs/ProfileDetails';
import ProfileTopInfo from './profileTopInfo/ProfileTopInfo';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
const Profile = () => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const loggedUser = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <ProfileHeader />  {/* ProfileHeader will be sticky at the top */}
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
    paddingTop: theme.spacing.xLarge,  // Adjust for the sticky header height
  },
  scrollView: {
    paddingTop: theme.spacing.xLarge,  // Ensure content doesn't go behind the header
  },
});

export default Profile;
