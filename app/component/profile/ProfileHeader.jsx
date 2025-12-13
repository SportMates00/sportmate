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

  return (
        <View>
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

    profileHeaderRight: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProfileHeader;
