import { useTheme } from '@/app/theme/themeContext';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';

const TermConditions = () => {
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
      });
    }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        By using this app, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </Text>

      <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
      <Text style={styles.text}>
        - You must provide accurate and up-to-date information during registration.{'\n'}
        - You agree not to misuse or exploit the app's services in any unauthorized way.{'\n'}
        - You are solely responsible for any activity on your account.
      </Text>

      <Text style={styles.sectionTitle}>3. Prohibited Activities</Text>
      <Text style={styles.text}>
        - Sharing inappropriate or illegal content.{'\n'}
        - Attempting to hack, modify, or interfere with the app’s functionality.{'\n'}
        - Impersonating others or creating fake accounts.
      </Text>

      <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
      <Text style={styles.text}>
        All content, logos, and designs in this app are the property of the app owner and are protected by copyright laws. Unauthorized use is prohibited.
      </Text>

      <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
      <Text style={styles.text}>
        The app owner is not responsible for any damages arising from the use or inability to use the app, including data loss or security breaches.
      </Text>

      <Text style={styles.sectionTitle}>6. Account Termination</Text>
      <Text style={styles.text}>
        We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful activities.
      </Text>

      <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
      <Text style={styles.text}>
        We may update these Terms and Conditions periodically. Continued use of the app signifies your acceptance of the updated terms.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact Us</Text>
      <Text style={styles.text}>
        If you have questions about these terms, please contact us through the app or via email.
      </Text>

      <Text style={styles.footer}>Thank you for using our app!</Text>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: theme.fonts.size.medium,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.text,
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
});

export default TermConditions;
