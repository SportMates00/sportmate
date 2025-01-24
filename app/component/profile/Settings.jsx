import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Alert, ScrollView } from 'react-native';

const Settings = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleVerifyAccount = () => {
    Alert.alert('Verification', 'Verify your account flow goes here.');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword'); // Example navigation
  };

  const handleLanguageSelection = () => {
    Alert.alert('Language', 'Language selection flow goes here.');
  };

  const handleContactUs = () => {
    Alert.alert('Contact Us', 'Contact information or support flow goes here.');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => console.log('Logged Out') },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => console.log('Account Deleted') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <Text style={styles.sectionHeader}>Account Settings</Text>
      <TouchableOpacity onPress={handleVerifyAccount} style={styles.option}>
        <Text style={styles.optionText}>Verify Your Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangePassword} style={styles.option}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Preferences */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      <TouchableOpacity onPress={handleLanguageSelection} style={styles.option}>
        <Text style={styles.optionText}>Select Language</Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      {/* Support */}
      <Text style={styles.sectionHeader}>Support</Text>
      <TouchableOpacity onPress={handleContactUs} style={styles.option}>
        <Text style={styles.optionText}>Contact Us</Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.optionText}>Version Information</Text>
        <Text style={styles.optionText}>1.0.0</Text>
      </View>

      {/* Legal */}
      <Text style={styles.sectionHeader}>Legal</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Terms & Conditions</Text>
      </TouchableOpacity>

      {/* Account Management */}
      <Text style={styles.sectionHeader}>Account Management</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.option}>
        <Text style={styles.optionText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteAccount} style={styles.option}>
        <Text style={[styles.optionText, { color: 'red' }]}>Delete My Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  optionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Settings;
