import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import LangChanger from '../../LangChanger';

const SelectLanguage = ({ isModalVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* LangChanger component */}
          <LangChanger />
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent background
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%', // Set width for modal content
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 9999, // Ensure modal is above all other content
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SelectLanguage;
