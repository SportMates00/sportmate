// app/SignUpScreen.js
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons';
import LangChanger from '../LangChanger';
import { users_list } from '@/src/js files/users';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '@/src/store/authSlice';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user); // Get user info from Redux
  const [emailExist, setEmailExist] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [userMap, setUserMap] = useState(new Map());



    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTitle: "",                // ❗ fully removes title
        headerShadowVisible: false, 
        headerBackButtonDisplayMode: "minimal", // (new API)
        headerBackTitleVisible: false,          // (for older versions, harmless if ignored)
        headerBackTitle: "",
              headerRight: () => (
        <LangChanger text={""}  />
      ),
        headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0, // remove line
      elevation: 0,         // Android
      shadowOpacity: 0,     // iOS
    },
      });
    }, [navigation]);

  useEffect(() => {
    // Preprocess user_list into a Map for fast lookups
    const map = new Map();
    users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
    setUserMap(map);
  }, [users_list.length]);

  function handleSignUp() {
    const foundUser = userMap.get(userInfo.email.toLowerCase());
    if (foundUser) {
      setEmailExist(true);
      setFieldError(false);
      setPasswordError(false);
    } else if (userInfo.password !== userInfo.confirmPassword) {
      setPasswordError(true);
      setEmailExist(false);
      setFieldError(false);
    } else if (
      userInfo.firstName !== '' &&
      userInfo.lastName !== '' &&
      userInfo.email !== '' &&
      userInfo.password !== '' &&
      userInfo.confirmPassword !== ''
    ) {
      setEmailExist(false);
      setPasswordError(false);
      navigation.navigate('QSport');
    } else {
      setFieldError(true);
      setEmailExist(false);
      setPasswordError(false);
    }
  }
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
  return (
    <View style={styles.container}>

      <View style={{marginBottom: 60}}>
        <Text style={styles.title}>{t('signupPage')}</Text>
        {emailExist && <Text style={styles.error}>{t('emailInUse')}</Text>}
        {passwordError && <Text style={styles.error}>{t('passwordDoNotMatch')}</Text>}
        {fieldError && <Text style={styles.error}>{t('allFieldsRequired')}</Text>}
      </View>

      <TextInput
        style={styles.input}
        placeholder={t('firstName')}
        onChangeText={(value) => dispatch(setUserInfo({ firstName: value }))}
      />
      <TextInput
        style={styles.input}
        placeholder={t('lastName')}
        onChangeText={(value) => dispatch(setUserInfo({ lastName: value }))}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        onChangeText={(value) => dispatch(setUserInfo({ email: value }))}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        onChangeText={(value) => dispatch(setUserInfo({ password: value }))}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPassword')}
        onChangeText={(value) => dispatch(setUserInfo({ confirmPassword: value }))}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>{t('alreadyHaveAnAccount')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{t('signupBtn')}</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25,
    backgroundColor:'white'
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing:1,
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomWidth:1,
    borderColor: '#ccc',
  },
  button: {
    marginTop:40,
    alignItems:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    backgroundColor:'#4CAF50' ,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    textAlign: 'center',
    width:'70%',
  },
  signInText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
  },  
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default SignUpScreen;
