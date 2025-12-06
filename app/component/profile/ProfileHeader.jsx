import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MenuTab from './menutab/MenuTab';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@/src/theme/themeContext';

const ProfileHeader = () => {
    const { theme } = useTheme(); // Get current theme and toggle (if needed)
    const styles = getStyles(theme); // Generate dynamic styles based on current theme
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
                <AntDesign name="adduser" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <MenuTab />
            </View>
        </View>    
  )
}

const getStyles = (theme) => StyleSheet.create({
    header: {
      position:'absolute',   // This ensures the header sticks to the top
      zIndex: 1000,
      top: theme.spacing.large,
      left: 0,
      right: 0,
      padding: theme.spacing.small,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.background, // Adjust as needed
    },
    backButton: {
        padding: theme.spacing.small,
    },
    backButtonText: {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.primary,
    },
    title: {
        fontSize: theme.fonts.size.large,
        fontWeight: 'bold',
        textAlign: 'center',
        color:theme.colors.text
    },
    profileHeaderRight: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProfileHeader;
