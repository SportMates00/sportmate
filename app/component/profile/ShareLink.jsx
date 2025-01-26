import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds


const ShareLink = () => {
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
    colors={['#6a11cb', '#2575fc']}
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
                <AntDesign name="closecircle" size={24} color="black" />
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
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      gradientButton: {
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '70%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButton: {
        backgroundColor: '#6a11cb',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
      },
      modalButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      shareModalButton: {
        backgroundColor: '#2575fc',
      },
      shareButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
      },

})

export default ShareLink