import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import mainPicture from '../../../assets/images/mainpicture.jpg';
import LangChanger from '../langChanger';
import { useTheme } from '../../theme/themeContext';

const WelcomeScreen = () => {
  const { t } = useTranslation();  // Hook to access translations
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={mainPicture} resizeMode="cover" style={styles.mainPictureBackgroundImage}>
        <Text style={styles.title}>{t('welcome')}</Text>  {/* Translated text */}
        <Text style={styles.subtitle}>{t('subtitle')}</Text>  {/* Translated text */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('login')}</Text>  {/* Translated text */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{t('signup')}</Text>  {/* Translated text */}
        </TouchableOpacity>
        {/* World Icon Button */}
        <LangChanger text={''} iconContainer={styles.iconContainer} />
      </ImageBackground>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,    // dynamic spacing
    color: theme.colors.text,              // dynamic text color
  },
  subtitle: {
    fontSize: theme.fonts.size.medium,       // dynamic font size
    marginBottom: theme.spacing.large,         // dynamic spacing
    color: theme.colors.text,                // dynamic text color
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,   // dynamic button color
    paddingVertical: 12,                     // kept numeric; could use theme.spacing if desired
    paddingHorizontal: 30,                   // kept numeric
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',                           // kept as white
    fontSize: 18,
  },
  mainPictureBackgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: theme.spacing.large,                // dynamic top spacing
    right: theme.spacing.medium,             // dynamic right spacing
    backgroundColor: theme.colors.background, // dynamic background (typically white in light mode)
    padding: 10,
    borderRadius: 50,
    shadowColor: theme.colors.text,          // dynamic shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default WelcomeScreen;
