import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../src/theme/themeContext';

const flags = {
  am: require('../../assets/flags/am.png'),
  en: require('../../assets/flags/en.png'),
  ru: require('../../assets/flags/ru.png'),
};

const LangChanger = ({ style, iconContainer, text }) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[iconContainer]}
        onPress={() => setModalVisible(true)}
        accessible={true}
        accessibilityLabel="Change Language"
      >
        <Image
          source={flags[i18n.language]}
          style={{
            width: 34,
            height: 34,
            borderRadius: 4,
            marginRight: text === '' ? 0 : 8,
          }}
        />

        {text === '' ? null : (
          <Text style={{ fontSize: theme.fonts.size.medium, color: theme.colors.text }}>
            {text}
          </Text>
        )}
      </TouchableOpacity>

      {/* Modal stays the same */}
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
                { label: 'Armenian', value: 'am' },
                { label: 'English', value: 'en' },
                { label: 'Russian', value: 'ru' },
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
  );
};

export default LangChanger;

const styles = StyleSheet.create({
  
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
