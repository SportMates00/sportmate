import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import EmailVerification from './EmailVerification';
import PhotoVerification from './PhotoVerification';

const VerifyAccount = () => {
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
      <Text style={styles.header}>Verify Your Account</Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  verificationStatusContainer: {
    marginVertical: 20,
  },
  verificationStatusHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verificationStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  verificationLabel: {
    fontSize: 16,
    color: '#555',
  },
  verificationStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default VerifyAccount;
