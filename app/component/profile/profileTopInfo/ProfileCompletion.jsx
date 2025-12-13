import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const ProfileCompletion = ({loggedUser,setModalVisible}) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const {t} = useTranslation();
  const completionSteps = [
    {id:1,step:loggedUser.firstName, text:t('inputName')},
    {id:2,step:loggedUser.lastName, text:t('inputLastName')},
    {id:3,step:loggedUser.profileInfo.sport, text:t('preferredSport')},
    {id:4,step:loggedUser.profileInfo.availability, text:t('fillTimeSlots')},
    {id:5,step:loggedUser.profileInfo.age, text:t('chooseAge')},
    {id:6,step:loggedUser.profileInfo.location, text:t('setLocation')},
    {id:7,step:loggedUser.profileInfo.gender, text:t('chooseGender')},
    {id:8,step:loggedUser.profileInfo.profileImageUrl, text:t('uploadPicture')},
  ] 

  return (
    <View style={styles.container}>
        {
          completionSteps.map((val) => {
            return (
              <TouchableOpacity key={val.id} style={styles.stepRow} onPress={ () => {
                if(val.step === ''){
                  navigation.navigate('EditProfile')
                  setModalVisible(false)
                }
              }
              }>
                <Ionicons name={val.step ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={val.step ? theme.colors.primary : '#888'}
                />
                <Text style={styles.stepText}>{val.text}</Text>
                {!val.step && (
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            )
          })
        }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepText: {
    flex: 1,
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
    marginLeft: theme.spacing.small,
  },
});

export default ProfileCompletion;
