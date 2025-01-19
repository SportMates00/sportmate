import { View, Text, FlatList,TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';  // Import Fontisto for the world icon
import { useTranslation } from 'react-i18next';


const langChanger = () => {
      const { t, i18n } = useTranslation();  // Hook to access translations
      const [modalVisible, setModalVisible] = useState(false);  // Track modal visibility
      const handleLanguageChange = (value) => {
        i18n.changeLanguage(value);  // Change language in i18n
        setModalVisible(false);  // Close the modal after language selection
      };
  return (
    <>
    <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
        <Fontisto name="world" size={24} color="black" />  {/* Fontisto World Icon */}
      </TouchableOpacity>
    <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={[
                    { label: 'Armenia', value: 'am' },
                    { label: 'English', value: 'en' },
                    { label: 'Russian', value: 'ru' },
                    // Add more languages here
                  ]}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleLanguageChange(item.value)} style={styles.languageOption}>
                      <Text style={styles.languageText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </>
  )
}

export default langChanger

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  languageOption: {
    paddingVertical: 10,
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 16,
    color: '#007BFF',
  }
});
