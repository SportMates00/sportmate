// app/LoginScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { users_list } from '@/app/js files/users';
import LangChanger from '../LangChanger';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/app/store/userSlice';
const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [loading, setLoading] = useState(false);
  const [userMap, setUserMap] = useState(new Map());

  useEffect(() => {
    const map = new Map();
    users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
    setUserMap(map);
  }, []);

  const handleLoginSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      })
    );
  };

  const handleLogin = async () => {
    setError({ email: '', password: '', general: '' });

    if (!user.email) {
      setError((prev) => ({ ...prev, email: t('Email is required') }));
      return;
    }
    if (!user.password) {
      setError((prev) => ({ ...prev, password: t('Password is required') }));
      return;
    }

    setLoading(true);
    try {
      const foundUser = userMap.get(user.email.toLowerCase());

      if (!foundUser) {
        setError((prev) => ({ ...prev, general: t('User not found') }));
      } else if (foundUser.password !== user.password) {
        setError((prev) => ({ ...prev, general: t('Incorrect password') }));
      } else {
        handleLoginSuccess();
        dispatch(setUserInfo(foundUser));
      }
    } catch (e) {
      console.error('Login error:', e);
      Alert.alert(t('Error'), t('An error occurred. Please try again.'));
    } finally {
      setLoading(false);
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
        source={require('../../../assets/images/icon.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{t('loginPage')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('Email')}
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value.trim() })}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email input"
      />
      {error.email && <Text style={styles.error}>{error.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder={t('Password')}
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
        secureTextEntry
        accessibilityLabel="Password input"
      />
      {error.password && <Text style={styles.error}>{error.password}</Text>}

      {error.general && <Text style={styles.error}>{error.general}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('loginBtn')}</Text>
        )}
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>{t("Don't have an account? Sign up")}</Text>
      </TouchableOpacity>

      <LangChanger text={''} iconContainer={styles.iconContainer} />
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
    width: 100,
    height: 100,
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
    alignItems: 'center',
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
    marginBottom: 10,
  },
  iconContainer: {
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
  },
});

export default LoginScreen;
