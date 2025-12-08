import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import mainPicture from '../../../assets/images/applogo.jpg';
import LangChanger from '../LangChanger';
import { useTheme } from '../../../src/theme/themeContext';

const WelcomeScreen = () => {
  const { t } = useTranslation();  // Hook to access translations
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('QSport');
  };
  const handleTermsConditions = () => {
        navigation.navigate('TermsConditions');
  };
  const handlePrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
  };
  return (
    <View style={styles.container}>
        
      <ImageBackground source={mainPicture} resizeMode="cover" style={styles.mainPictureBackgroundImage}>
        <LangChanger text={''} iconContainer={styles.iconContainer} />
        <View style={{marginBottom:40}}>
          <View style={styles.secondContainer}>
            <Text style={styles.title}>SportMate</Text>  {/* Translated text */}
            <Text style={styles.subtitle}>{t('subtitle')}</Text>  {/* Translated text */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>{t('signup')}</Text>  {/* Translated text */}
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:'20'}} onPress={handleLogin}>
              <Text style={{color:'white', }}>{t('haveAccount')}</Text>  {/* Translated text */}
              <Text style={{textAlign:'center', color:'white', fontWeight:'800', marginTop:'8', marginBottom:'50', textDecorationLine:'underline'}}>{t('login')}</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.bottomPage}>
            <Text style={{color:'white',textDecorationLine:'underline'}} onPress={handleTermsConditions}>Terms and Conditions</Text>
            <Text style={{color:'white',textDecorationLine:'underline'}} onPress={handlePrivacyPolicy}>Privacy Policy</Text>
          </View>
        </View>
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
    color: theme.colors.buttonText,              // dynamic text color
  },
  subtitle: {
    fontSize: theme.fonts.size.medium,       // dynamic font size
    marginBottom: theme.spacing.large,         // dynamic spacing
    color: theme.colors.buttonText,                // dynamic text color
    textAlign: 'center',
    width:'70%'
  },
  button: {
    paddingVertical: 12,                     // kept numeric; could use theme.spacing if desired
    paddingHorizontal: 30,                   // kept numeric
    borderRadius: 5,
    marginBottom: 15,
    width: '70%',
    alignItems: 'center',
    borderWidth:1,
    borderColor:theme.colors.buttonText
  },
  buttonText: {
    color: theme.colors.buttonText,                           // kept as white
    fontSize: 16,
    fontWeight:900
  },
  mainPictureBackgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top:50,
    right:30
  },
  secondContainer: {
    display:'flex',
    alignItems:'center',
  },

  bottomPage: {
    flexDirection:'row',
    justifyContent:'space-around',
    paddingInline:'40',
    marginTop:'20',
  }
});

export default WelcomeScreen;
