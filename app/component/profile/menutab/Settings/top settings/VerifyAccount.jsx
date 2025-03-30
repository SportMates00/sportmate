import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, Alert, Platform } from 'react-native';
import EmailVerification from './EmailVerification';
import PhotoVerification from './PhotoVerification';
import { useTheme } from '@/app/theme/themeContext';
import { useNavigation } from '@react-navigation/native';

const VerifyAccount = () => {

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();
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
          backgroundColor:theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontSize:theme.fonts.size.large
        },
        headerTitleAlign: 'center',
        headerTitle:'Verify Your Account'
      });
    }, [navigation]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhotoVerified, setIsPhotoVerified] = useState(false);

  const handleEmailVerification = () => {
    setIsEmailVerified(true);
  };

  const handlePhotoVerification = () => {
    setIsPhotoVerified(true);
  };

  const handleSubmit = () => {
    if (isEmailVerified && isPhotoVerified) {
      Alert.alert('Success', 'Your account and profile photo have been verified!');
    } else {
      Alert.alert('Error', 'Please complete both the email and photo verification.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subHeader}>Complete the verification process to secure your account.</Text>

      {/* Verification Steps */}
      <Text style={styles.stepsTitle}>Verification Steps:</Text>
      <Text style={styles.stepText}>1. Verify your email address by clicking the verification link sent to your email.</Text>
      <Text style={styles.stepText}>2. Verify your profile photo by uploading a clear picture of yourself.</Text>

      {/* Verification Status */}
      <View style={styles.verificationStatusContainer}>
        <Text style={styles.verificationStatusHeader}>Verification Status</Text>
        <View style={styles.verificationStatusRow}>
          <Text style={styles.verificationLabel}>Email Verification</Text>
          <Text style={[styles.verificationStatusText, isEmailVerified ? styles.success : styles.pending]}>
            {isEmailVerified ? 'Verified' : 'Pending'}
          </Text>
        </View>
        <View style={styles.verificationStatusRow}>
          <Text style={styles.verificationLabel}>Profile Photo Verification</Text>
          <Text style={[styles.verificationStatusText, isPhotoVerified ? styles.success : styles.pending]}>
            {isPhotoVerified ? 'Verified' : 'Pending'}
          </Text>
        </View>
      </View>

      {/* Email Verification Component */}
      <EmailVerification onVerify={handleEmailVerification} />

      {/* Photo Verification Component */}
      <PhotoVerification onPhotoVerified={handlePhotoVerification} />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  subHeader: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 20,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text,
  },
  stepText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  verificationStatusContainer: {
    marginVertical: 20,
  },
  verificationStatusHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text,
  },
  verificationStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color: theme.colors.text,
  },
  verificationLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  verificationStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  success: {
    color: theme.colors.primary,
  },
  pending: {
    color: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default VerifyAccount;
