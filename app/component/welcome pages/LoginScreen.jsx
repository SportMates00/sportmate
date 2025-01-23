// app/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CommonActions, useNavigation } from '@react-navigation/native'; // For navigation
import LangChanger from '../LangChanger';
import Ionicons from '@expo/vector-icons/Ionicons';
import { users_list } from '../../js files/users';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // To navigate between screens
  const [user, setUser] = useState({
    email:'',
    password:''
  });
  const [error, setError] = useState(false);
  const [userMap, setUserMap] = useState(new Map());

  useEffect(() => {
    // Preprocess user_list into a Map for fast lookups
    const map = new Map();
    users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
    setUserMap(map);
  }, []);

 //removes the previous pages after successfully logged in.
  function handleLoginSuccess() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      })
    );
  }

  const handleLogin = async () => {
    const foundUser = userMap.get(user.email.toLowerCase()); // O(1) lookup
    if (foundUser && foundUser.password == user.password) {
      try{
        await AsyncStorage.setItem('loggedUser', JSON.stringify(foundUser));
        navigation.navigate('HomeTabs')
        handleLoginSuccess();
        setError(false); // Login successful  
      }catch (e) {
        console.error('Failed to save user data:', e);
      }
    } else {
      setError(true); // Email not found or password incorrect
    }
  };
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../../assets/images/icon.png')} // Make sure to add your logo in the assets folder
        style={styles.logo}
      />

      <Text style={styles.title}>{t('loginPage')}</Text>

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
      {error && <Text style={styles.error}>Invalid email or password</Text>}
      <TouchableOpacity style={styles.button} 
      onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('loginBtn')}</Text>
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>{t("don't have an account? Sign up")}</Text>
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
  signUpText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
