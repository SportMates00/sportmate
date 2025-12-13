import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const { t } = useTranslation();

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        headerBackTitleVisible: false,
        headerBackTitle: "",
  
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
            headerTitleStyle: {
        color: theme.colors.text,
      },
  
      // ✅ Back arrow & icons color
      headerTintColor: theme.colors.text,
      });
    }, [navigation,theme]);

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
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* New Password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder={t('NewPassword')}
        placeholderTextColor={theme.colors.text}
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
        placeholderTextColor={theme.colors.text}
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

export default ChangePassword;

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  input: {
    height: 45,
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
    backgroundColor: theme.colors.background,
  },

  invalidInput: {
    borderColor: theme.colors.error,
  },

  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.family,
  },

  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: 10,
    fontFamily: theme.fonts.family,
  },

  requirements: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 20,
    fontFamily: theme.fonts.family,
  },
});
