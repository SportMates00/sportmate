import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import React from 'react'
import randomIcon from '../../../assets/images/favicon.png'
import MenuTab from './MenuTab';
import { useNavigation } from '@react-navigation/native';

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
                    <Image source={randomIcon} />
                </TouchableOpacity>
                <MenuTab />
            </View>
        </View>    
  )
}

const styles = StyleSheet.create({
    header: {
      position:'sticky',
      zIndex: 1000,
      top:0,
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

export default ProfileHeader