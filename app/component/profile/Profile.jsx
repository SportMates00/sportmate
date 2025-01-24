import { View, Image, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './profileTabs/ProfileDetails';
import ProfileTopInfo from './ProfileTopInfo';
// import { launchImageLibrary } from 'react-native-image-picker'; // For image selection

const Profile = ({ navigation }) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [loggedUser, setLoggedUser] = useState(
    {firstName:'', lastName: '', email:'', password:'', profileInfo: {
      sport: '',
      level: '',
      availibility: {
          Mon: { Morning: false, Afternoon: true, Evening: false },
          Tue: { Morning: false, Afternoon: false, Evening: false },
          Wed: { Morning: false, Afternoon: false, Evening: false },
          Thu: { Morning: true, Afternoon: false, Evening: false },
          Fri: { Morning: false, Afternoon: false, Evening: false },
          Sat: { Morning: false, Afternoon: false, Evening: false },
          Sun: { Morning: false, Afternoon: false, Evening: false },
      },
    },}
  );


  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('loggedUser');
        if (savedUser) {
          setLoggedUser(JSON.parse(savedUser));
          const calculateCompletion = () => {
            let percentage = 0;
            if (loggedUser.firstName) percentage += 0;
            if (loggedUser.lastName) percentage += 25;
            if (loggedUser.profileInfo.sport) percentage += 25;
            if (loggedUser.profileInfo.level) percentage += 25;
            setCompletionPercentage(percentage);
          }
          calculateCompletion();
        }
      } catch (e) {
        console.error('Failed to load user info:', e);
      }
    };
    
    loadUserInfo();
    console.log('Test')
  },[loggedUser.email])

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileTopInfo loggedUser={loggedUser} completionPercentage={completionPercentage}/>
      <ProfileDetails loggedUser={loggedUser}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'

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
