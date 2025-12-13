import React, { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import EmailVerification from './EmailVerification';
import PhotoVerification from './PhotoVerification';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const VerifyAccount = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle:
        Platform.OS === 'web'
          ? { borderBottom: 'none', boxShadow: 'none' }
          : { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,
        fontSize: theme.fonts.size.large,
      },
      headerTitleAlign: 'center',
      headerTitle: t('VerifyAccount'),
    });
  }, [navigation, t]);

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
      Alert.alert(
        t('Success'),
        t('VerificationSuccess')
      );
    } else {
      Alert.alert(
        t('Error'),
        t('VerificationIncomplete')
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subHeader}>
        {t('VerifyAccountDescription')}
      </Text>

      {/* Verification Steps */}
      <Text style={styles.stepsTitle}>
        {t('VerificationSteps')}
      </Text>

      <Text style={styles.stepText}>
        {t('VerifyStepEmail')}
      </Text>
      <Text style={styles.stepText}>
        {t('VerifyStepPhoto')}
      </Text>

      {/* Verification Status */}
      <View style={styles.verificationStatusContainer}>
        <Text style={styles.verificationStatusHeader}>
          {t('VerificationStatus')}
        </Text>

        <View style={styles.verificationStatusRow}>
          <Text style={styles.verificationLabel}>
            {t('EmailVerification')}
          </Text>
          <Text
            style={[
              styles.verificationStatusText,
              isEmailVerified ? styles.success : styles.pending,
            ]}
          >
            {isEmailVerified ? t('Verified') : t('Pending')}
          </Text>
        </View>

        <View style={styles.verificationStatusRow}>
          <Text style={styles.verificationLabel}>
            {t('PhotoVerification')}
          </Text>
          <Text
            style={[
              styles.verificationStatusText,
              isPhotoVerified ? styles.success : styles.pending,
            ]}
          >
            {isPhotoVerified ? t('Verified') : t('Pending')}
          </Text>
        </View>
      </View>

      {/* Verification Components */}
      <EmailVerification onVerify={handleEmailVerification} />
      <PhotoVerification onPhotoVerified={handlePhotoVerification} />

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {t('Submit')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
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
    },
    verificationLabel: {
      fontSize: 16,
      color: theme.colors.text,
    },
    verificationStatusText: {
      fontSize: 16,
      fontWeight: 'bold',
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
