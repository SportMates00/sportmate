import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from '@/src/theme/themeContext';

const ProfileCompletion = ({loggedUser,setModalVisible}) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const completionSteps = [
    {id:1,step:loggedUser.firstName, text:'Input your first name'},
    {id:2,step:loggedUser.lastName, text:'Input your last name'},
    {id:3,step:loggedUser.profileInfo.sport, text:'Choose your preferred sport'},
    {id:4,step:loggedUser.profileInfo.availability, text:'Fill your available time slot(s)'},
    {id:5,step:loggedUser.profileInfo.age, text:'Choose your age'},
    {id:6,step:loggedUser.profileInfo.location, text:'Set the location closest to you'},
    {id:7,step:loggedUser.profileInfo.gender, text:'Choose your gender'},
    {id:8,step:loggedUser.profileInfo.profileImageUrl, text:'Upload your profile picture'},
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
