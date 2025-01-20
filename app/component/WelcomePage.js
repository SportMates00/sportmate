// app/WelcomeScreen.js
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import mainPicture from '../../assets/images/mainpicture.jpg'
import LangChanger from './LangChanger';
const WelcomeScreen = () => {
  const { t, i18n } = useTranslation();  // Hook to access translations
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };



  return (
    <View style={styles.container}>
      <ImageBackground source={mainPicture}
      resizeMode='cover'
      style={styles.mainPictureBackgroundImage}>
      <Text style={styles.title}>{t('welcome')}</Text>  {/* Translated text */}
      <Text style={styles.subtitle}>{t('subtitle')}</Text>  {/* Translated text */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login')}</Text>  {/* Translated text */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{t('signup')}</Text>  {/* Translated text */}
      </TouchableOpacity>
      {/* World Icon Button */}     
        <LangChanger />     
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a2a2a',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#6c6c6c',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  mainPictureBackgroundImage:{
    height:'100%',
    width:'100%',
    resizeMode:'cover',
    flex:'1',
    justifyContent:'center',
    textAlign:'center'
  }
});

export default WelcomeScreen;
