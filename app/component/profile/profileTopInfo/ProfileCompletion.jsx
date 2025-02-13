import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const ProfileCompletion = ({loggedUser,setModalVisible}) => {
  const navigation = useNavigation();

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
                  color={val.step ? '#1E90FF' : '#999'}
                />
                <Text style={styles.stepText}>{val.text}</Text>
                {!val.step && (
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                )}
              </TouchableOpacity>
            )
          })
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default ProfileCompletion;
