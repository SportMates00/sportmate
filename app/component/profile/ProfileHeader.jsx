import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MenuTab from './menutab/MenuTab';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProfileHeader = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('HomeTabs'); // Navigates back to the previous screen
      };

  return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileHeaderRight}>
                <TouchableOpacity onPress={() => navigation.navigate('ShareProfile')}>
                <AntDesign name="adduser" size={24} color="black" />
                </TouchableOpacity>
                <MenuTab />
            </View>
        </View>    
  )
}

const styles = StyleSheet.create({
    header: {
      position:'absolute',   // This ensures the header sticks to the top
      zIndex: 1000,
      top: 30,
      left: 0,
      right: 0,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white', // Adjust as needed
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007aff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileHeaderRight: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProfileHeader;
