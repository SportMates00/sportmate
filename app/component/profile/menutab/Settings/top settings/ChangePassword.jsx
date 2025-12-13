import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('Error'), t('PasswordsDoNotMatch'));
      return;
    }

    if (newPassword.length < 8) {
      setIsPasswordValid(false);
      return;
    }

    setIsPasswordValid(true);
    Alert.alert(t('Success'), t('PasswordChangedSuccess'));
    // TODO: handle password change logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {t('ChangePassword')}
      </Text>

      {/* Current Password */}
      <TextInput
        style={styles.input}
        placeholder={t('CurrentPassword')}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* New Password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder={t('NewPassword')}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {!isPasswordValid && (
        <Text style={styles.errorText}>
          {t('PasswordMinLength')}
        </Text>
      )}

      {/* Confirm New Password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder={t('ConfirmNewPassword')}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {!isPasswordValid && (
        <Text style={styles.errorText}>
          {t('PasswordsDoNotMatch')}
        </Text>
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>
          {t('ChangePassword')}
        </Text>
      </TouchableOpacity>

      {/* Password requirements */}
      <Text style={styles.requirements}>
        {t('PasswordRequirements')}
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
