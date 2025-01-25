import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';

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
        <Text style={styles.shareButtonText}>Share Link</Text>
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
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 6,
        marginTop: 10,
        alignItems: 'center',
      },
      modalButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      shareButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        width: '80%',
      },
})

export default ShareLink