import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './profileTabs/ProfileDetails';
import ProfileTopInfo from './ProfileTopInfo';
import { UserContext } from '@/app/UserProvider';
// import { launchImageLibrary } from 'react-native-image-picker'; // For image selection

const Profile = ({loggedUser ,completionPercentage}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}} >
      <View style={styles.container}>
      <ProfileHeader />
      <ProfileTopInfo loggedUser={loggedUser} completionPercentage={completionPercentage}/>
      <ProfileDetails loggedUser={loggedUser}/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileButton: {
    padding: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  profileRight: {
    color:'black'
  },
});

export default Profile;
