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
      <ProfileTopInfo loggedUser={loggedUser} /> 
        <ProfileDetails loggedUser={loggedUser} />
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
