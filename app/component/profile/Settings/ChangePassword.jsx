import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Track validity of the password

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // You can add password validation here (length, special characters, etc.)
      if (newPassword.length >= 8) {
        Alert.alert('Success', 'Your password has been changed successfully.');
        // Handle the password change logic here
      } else {
        setIsPasswordValid(false);
      }
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Your Password</Text>

      {/* Current Password */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* New Password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {!isPasswordValid && <Text style={styles.errorText}>Password must be at least 8 characters long</Text>}

      {/* Confirm New Password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {!isPasswordValid && <Text style={styles.errorText}>Passwords do not match</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Password Requirements */}
      <Text style={styles.requirements}>
        Password must be at least 8 characters long, with at least one uppercase letter and one special character.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  requirements: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
  },
});

export default ChangePassword;
