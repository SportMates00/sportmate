import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

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
              onPress={() => navigation.navigate('')} > // Replace 'Page1' with your actual route name 
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
        </View>
        <View style={styles.cancelContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  
  header: {
    height: 'auto',
    paddingHorizontal: 20
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    position:'absolute',
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position:'absolute',
    bottom:70,
    height: '40%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  cancelContent: {
    position:'absolute',
    bottom:20,
    height:40,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton:{
    color:'black'
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white', // Change color as needed
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default MenuTab;
