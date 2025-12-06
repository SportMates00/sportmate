import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import { useTheme } from '@/src/theme/themeContext';


const ShareLink = () => {
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
    const [modalVisible, setModalVisible] = useState(false);
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
      const openModal = () => setModalVisible(true);
    
      const handleCopyLink = () => {
      };
    
      const handleShare = () => {
      };
    

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={styles.shareButton}>
        <LinearGradient
          colors={['#4CAF50', '#66BB6A']}
          style={[styles.gradientButton, { alignItems: 'center', justifyContent: 'center' }]} // Ensure content is centered
        >
          <Text style={styles.shareButtonText}>Share Link</Text>
        </LinearGradient>
      </TouchableOpacity>

    {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Close button */}
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <AntDesign name="closecircle" size={24} color={theme.colors.text} />
              </TouchableOpacity>
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
        </Modal>
    )}
    </View>
  )
}
const getStyles = (theme) => StyleSheet.create({

      gradientButton: {
        paddingVertical: theme.spacing.medium,
        paddingHorizontal: theme.spacing.medium,
        borderRadius: theme.radius.semiCircle,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
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
        borderTopLeftRadius: theme.radius.semiCircle,
        borderTopRightRadius: theme.radius.semiCircle,
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
      shareButtonText: {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.buttonText,
        fontWeight: '600',
      },

})

export default ShareLink