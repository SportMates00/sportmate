import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MenuTab = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openModal} style={styles.menuButton}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal for Bottom Popup */}
      <Modal 
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
        <View style={styles.modalContent}>

          <TouchableOpacity 
            style={styles.modalButton} 
            onPress={() => navigation.navigate('')} // Replace 'Page1' with your actual route name
          >
            <Text style={styles.modalButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modalButton} 
            onPress={() => navigation.navigate('')} // Replace 'Page2' with your actual route name
          >
            <Text style={styles.modalButtonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modalButton} 
            onPress={() => navigation.navigate('')} // Replace 'Page3' with your actual route name
          >
            <Text style={styles.modalButtonText}>Profile Viewers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <MaterialIcons name="cancel" size={24} color="black" />
          </TouchableOpacity>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it appears above other content
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007aff', // Change color as needed
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuTab;
