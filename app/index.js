// app/WelcomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Fontisto from '@expo/vector-icons/Fontisto';  // Import Fontisto for the world icon

const WelcomeScreen = () => {
  const { t, i18n } = useTranslation();  // Hook to access translations
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);  // Track modal visibility
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);  // Change language in i18n
    setModalVisible(false);  // Close the modal after language selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>  {/* Translated text */}
      <Text style={styles.subtitle}>{t('subtitle')}</Text>  {/* Translated text */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login')}</Text>  {/* Translated text */}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{t('signup')}</Text>  {/* Translated text */}
      </TouchableOpacity>

      {/* World Icon Button */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
        <Fontisto name="world" size={24} color="black" />  {/* Fontisto World Icon */}
      </TouchableOpacity>

      {/* Language Selection Modal */}
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
                { label: 'Armenina', value: 'am' },
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a2a2a',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#6c6c6c',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
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
  },
});

export default WelcomeScreen;
