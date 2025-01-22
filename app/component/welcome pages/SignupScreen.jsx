// app/SignUpScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons';
import LangChanger from '../LangChanger';
import { users_list } from '@/app/js files/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // For navigating between screens
  const [emailExist, setEmailExist] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [user, setUser] = useState(
    {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPassword:'',
      profileInfo:{ game:'', sport:'', availibility:{}}
    }
  );
  const [userMap, setUserMap] = useState(new Map());
    useEffect(() => {
      // Preprocess user_list into a Map for fast lookups
      const map = new Map();
      users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
      setUserMap(map);
    }, [users_list.length]);

  async function handleSignUp(){
    const foundUser = userMap.get(user.email.toLowerCase());
    if(foundUser){
      setEmailExist(true);
      setFieldError(false)
      setPasswordError(false)
    
    }else if(user.password !== user.confirmPassword){
      setPasswordError(true)
      setEmailExist(false);
      setFieldError(false)
    }else if(user.firstName !== '' & user.lastName !=='' & user.email !== '' & user.email !== '' & user.password !== '' & user.confirmPassword !== ''){
      try{
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        setEmailExist(false)
        setPasswordError(false)
        users_list.push(user)
        navigation.navigate('HomeTabs')
      }catch(e){
        console.error('Failed to load user info:', e);
      }
      }else {
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
        onChangeText={(value) => setUser({...user, firstName:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('lastName')}
        onChangeText={(value) => setUser({...user, lastName:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        onChangeText={(value) => setUser({...user, email:value})}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        onChangeText={(value) => setUser({...user, password:value})}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPassword')}
        onChangeText={(value) => setUser({...user,confirmPassword:value})}
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
      
      <LangChanger />
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
