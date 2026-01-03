import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { logout } from '@/src/store/authSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../../src/theme/themeContext';
import TopSettings from './top settings/TopSettings';
import BottomSettings from './bottom settings/BottomSettings';
import contact from '../../../../../assets/images/contact.png';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { theme, mode } = useTheme();
  const styles = getStyles(theme, mode);

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

const handleLogout = () => {
  Alert.alert(
    t("LogoutTitle"),
    t("LogoutMessage"),
    [
      { text: t("Cancel"), style: "cancel" },

      {
        text: t("Logout"),
        style: "destructive",
        onPress: () => {
          dispatch(logout());

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            })
          );
        },
      },
    ]
  );
};

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: Platform.OS === 'web'
        ? { borderBottom: 'none', boxShadow: 'none' }
        : { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
      headerStyle: {
        backgroundColor: mode === 'dark'
          ? 'rgb(65, 147, 42)'
          : 'rgb(177, 250, 156)',
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,
        fontSize: theme.fonts.size.large,
      },
      headerTitleAlign: 'center',
      headerTitle: t('Settings'),
    });
  }, [navigation, mode, t]);

  return (
    <ScrollView style={styles.container}>
      {/* Contact Support */}
      <View style={styles.contactContainer}>
        <Image style={styles.contactImage} source={contact} />
        <TouchableOpacity onPress={handleContactUs} style={styles.contactButton}>
          <Text style={styles.contactText}>
            {t('ContactSupport')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: theme.spacing.large }}>
        <TopSettings />
        <BottomSettings />

        <View style={{ gap: 20, paddingVertical: theme.spacing.large }}>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.optionRow}>
              <SimpleLineIcons
                name="logout"
                size={theme.fonts.size.xLarge}
                color={theme.colors.text}
              />
              <Text style={styles.optionText}>
                {t('Logout')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <View style={styles.optionRow}>
              <MaterialIcons
                name="delete"
                size={theme.fonts.size.xLarge}
                color={theme.colors.text}
              />
              <Text style={[styles.optionText, { color: 'red' }]}>
                {t('DeleteAccount')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme, mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    optionText: {
      fontSize: theme.fonts.size.medium,
      color: theme.colors.text,
    },
    contactContainer: {
      backgroundColor:
        mode === 'dark' ? 'rgb(65, 147, 42)' : 'rgb(177, 250, 156)',
      alignItems: 'center',
      gap: 20,
      paddingBottom: theme.spacing.large,
    },
    contactButton: {
      backgroundColor: theme.colors.primary,
      width: '65%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.semiCircle,
    },
    contactImage: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
    },
    contactText: {
      color: theme.colors.buttonText,
      fontSize: theme.fonts.size.medium,
    },
  });

export default Settings;
