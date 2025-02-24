import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import LangChanger from '@/app/component/LangChanger';
import { useDispatch } from 'react-redux';
import { resetUserInfo } from '@/app/store/userSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/themeContext';

const Settings = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  // Use the ThemeContext to get the current mode and toggle function.
  // No local dark mode state needed.
  const { mode, toggleTheme } = useTheme();

  const handleVerification = () => {
    navigation.navigate('VerifyAccount');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsConditions = () => {
    navigation.navigate('TermsConditions');
  };
  
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => {
        dispatch(resetUserInfo());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }]
          })
        );
      } },
    ]);
  };

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };
useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
          headerStyle: Platform.OS == 'web' ? {
            borderBottom: 'none',
            boxShadow: 'none',
          } : {
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,
      },
    });
  }, [navigation,mode]);

  const iconContainer = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.medium,
    borderRadius: theme.radius.circle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: theme.radius.semiCircle,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <Text style={styles.sectionHeader}>Account Settings</Text>
      <TouchableOpacity onPress={handleVerification} style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="verified-user" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Verify Your Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangePassword} style={styles.option}>
        <View style={styles.optionRow}>
          <Feather name="lock" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Change Password</Text>
        </View>
      </TouchableOpacity>

      {/* Preferences */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      <TouchableOpacity onPress={openModal} style={styles.option}>
        <View style={styles.optionRow}>
          <LangChanger iconContainer={iconContainer} text={'Select language'} isModalVisible={isModalVisible} closeModal={closeModal} />
        </View>
      </TouchableOpacity>

      <View style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="dark-mode" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Dark Mode</Text>
        </View>
        <Switch
          value={mode === 'dark'}  // Switch is on if the current mode is 'dark'
          onValueChange={toggleTheme}  // Toggle theme and persist change
        />
      </View>
      <View style={styles.option}>
        <View style={styles.optionRow}>
          <Ionicons name="notifications" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Enable Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      {/* Support */}
      <Text style={styles.sectionHeader}>Support</Text>
      <TouchableOpacity onPress={handleContactUs} style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="support-agent" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.option}>
        <View style={styles.optionRow}>
          <Entypo name="info" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Version Information</Text>
        </View>
        <Text style={styles.optionText}>1.0.0</Text>
      </View>

      {/* Legal */}
      <Text style={styles.sectionHeader}>Legal</Text>
      <TouchableOpacity onPress={handlePrivacyPolicy} style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="privacy-tip" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTermsConditions} style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="rule" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </View>
      </TouchableOpacity>

      {/* Account Management */}
      <Text style={styles.sectionHeader}>Account Management</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.option}>
        <View style={styles.optionRow}>
          <SimpleLineIcons name="logout" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Log Out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteAccount} style={styles.option}>
        <View style={styles.optionRow}>
          <MaterialIcons name="delete-forever" size={24} color="black" style={styles.optionIcon} />
          <Text style={[styles.optionText, { color: 'red' }]}>Delete My Account</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Settings;
