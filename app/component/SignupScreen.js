// app/SignUpScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // For navigating between screens

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/images/icon.png')} // Adjust the path to your logo
        style={styles.logo}
      />

      <Text style={styles.title}>{t('signupPage')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('firstName')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('lastName')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPassword')}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('signupBtn')}</Text>
      </TouchableOpacity>

      {/* Sign-In Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>{t("Already Have Account? Sign in")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#4CAF50',
  },
  logo: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signInText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SignUpScreen;
