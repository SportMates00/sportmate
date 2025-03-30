import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { resetUserInfo } from '@/app/store/userSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/themeContext';
import TopSettings from './top settings/TopSettings';
import BottomSettings from './bottom settings/BottomSettings';
import contact from '../../../../../assets/images/contact.png'

const Settings = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const { mode } = useTheme();
  const styles = getStyles(theme,mode); // Generate dynamic styles based on current theme
  // Use the ThemeContext to get the current mode and toggle function.
  // No local dark mode state needed.
  

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };
  
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => {
        dispatch(resetUserInfo());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }]
          })
        );
      } },
    ]);
  };

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };
useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
          headerStyle: Platform.OS == 'web' ? {
            borderBottom: 'none',
            boxShadow: 'none',
          } : {
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
      headerStyle: {
        backgroundColor:mode == 'dark' ? 'rgb(65, 147, 42)' : 'rgb(177, 250, 156)',
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,
        fontSize:theme.fonts.size.large
      },
      headerTitleAlign: 'center',
    });
  }, [navigation,mode]);

 
  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <View style={styles.contactContainer}>
        <Image style={styles.contactImage} source={contact}/>
        <TouchableOpacity onPress={handleContactUs} style={styles.contactButton}>
          <Text style={styles.contactText}>
            Contact support
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: theme.spacing.large,}}>
        <TopSettings />
        <BottomSettings />

        <View style={{gap:20, paddingVertical:theme.spacing.large}}>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.optionRow}>
              <SimpleLineIcons style={styles.test} name="logout" size={theme.fonts.size.xLarge} color={theme.colors.text} />
              <Text style={styles.optionText}>Log Out</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <View style={styles.optionRow}>
              <MaterialIcons name="delete" style={styles.test} size={theme.fonts.size.xLarge} color={theme.colors.text} />
              <Text style={[styles.optionText, { color: 'red' }]}>Delete My Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme,mode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20,
  },
  optionText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
  },
  contactContainer:{
    backgroundColor: mode == 'dark' ? 'rgb(65, 147, 42)' : 'rgb(177, 250, 156)',
    alignItems:'center', 
    gap:20,
    paddingBottom:theme.spacing.large,
  },
  contactButton:{
    backgroundColor:theme.colors.primary,
    width:'65%',
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:theme.radius.semiCircle
  },
  contactImage:{width:'100%',height:300,resizeMode: 'contain'},
  contactText:{
    color:theme.colors.buttonText,
    fontSize:theme.fonts.size.medium, }
});

export default Settings;
