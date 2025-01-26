// app/SignUpScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons';
import LangChanger from '../LangChanger';
import { users_list } from '@/app/js files/users';
import { UserContext } from '@/app/UserProvider';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // For navigating between screens
  const [emailExist, setEmailExist] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [userMap, setUserMap] = useState(new Map());
  const iconContainer = {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }

    useEffect(() => {
      // Preprocess user_list into a Map for fast lookups
      const map = new Map();
      users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
      setUserMap(map);
    }, [users_list.length]);

   function handleSignUp(){
    const foundUser = userMap.get(userInfo.email.toLowerCase());
    if(foundUser){
      setEmailExist(true);
      setFieldError(false)
      setPasswordError(false)
    
    }else if(userInfo.password !== userInfo.confirmPassword){
      setPasswordError(true)
      setEmailExist(false);
      setFieldError(false)
    }else if(userInfo.firstName !== '' & userInfo.lastName !=='' & userInfo.email !== '' & userInfo.email !== '' & userInfo.password !== '' & userInfo.confirmPassword !== ''){
        setEmailExist(false)
        setPasswordError(false)
        navigation.navigate('ClientInfo')
      } else {
      setFieldError(true)
      setEmailExist(false)
      setPasswordError(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../../assets/images/icon.png')} // Adjust the path to your logo
        style={styles.logo}
      />

      <Text style={styles.title}>{t('signupPage')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('firstName')}
        onChangeText={(value) => setUserInfo({...userInfo, firstName:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('lastName')}
        onChangeText={(value) => setUserInfo({...userInfo, lastName:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        onChangeText={(value) => setUserInfo({...userInfo, email:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        onChangeText={(value) => setUserInfo({...userInfo, password:value})}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPassword')}
        onChangeText={(value) => setUserInfo({...userInfo,confirmPassword:value})}
        secureTextEntry
      />
      {emailExist && <Text>Email is already in use</Text>}
      {passwordError && <Text>Password does not match</Text>}
      {fieldError && <Text>All the fields are required</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{t('signupBtn')}</Text>
      </TouchableOpacity>

      {/* Sign-In Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>{t("Already Have Account? Sign in")}</Text>
      </TouchableOpacity>
      
      <LangChanger text={''} iconContainer={iconContainer}/>
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
