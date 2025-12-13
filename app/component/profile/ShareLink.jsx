import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';


const ShareLink = () => {
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const navigation = useNavigation();
  const handleCopyLink = () => {
      };
    
      const handleShare = () => {
      };
    
useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    headerTitle: "",
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
    headerBackTitleVisible: false,
    headerBackTitle: "",
      headerStyle: {
        backgroundColor: theme.colors.background, // Change header background color
      },
      headerTintColor: theme.colors.text, // Change back arrow color
    });
  }, [navigation]);
  return (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Modal Content */}
              <Text style={styles.modalText}>
                Hi! Check out this app, you can find your sport mates and enjoy your favorite sport while making new friends and finding new mates. Download the app from this link and sign up now.
              </Text>

              {/* Buttons */}
              <TouchableOpacity onPress={handleCopyLink} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Copy Link</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
  )
}
const getStyles = (theme) => StyleSheet.create({


      
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalContainer: {
        backgroundColor: theme.colors.background,
        width: '100%',
        height: '100%',
        padding: theme.spacing.medium,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      modalText: {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.medium,
        textAlign: 'center',
      },
      modalButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.medium,
        borderRadius: theme.radius.semiCircle,
        alignItems: 'center',
        marginBottom: theme.spacing.medium,
        width: '100%',
      },
      modalButtonText: {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.buttonText,
      },


})

export default ShareLink