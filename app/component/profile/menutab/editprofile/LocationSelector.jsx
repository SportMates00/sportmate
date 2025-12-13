import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon



const LocationSelector = ({ editUser, setEditUser }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();
  const handleSelectRegion = (region) => {
    setEditUser((prev) => ({
      ...prev,
      profileInfo: { ...prev.profileInfo, location: region },
    }));
    setModalVisible(false); // Close modal when a region is selected
  };

  const regions = [
  { key: 'Yerevan', label: t('Yerevan') },
  { key: 'Aragatsotn', label: t('Aragatsotn') },
  { key: 'Ararat', label: t('Ararat') },
  { key: 'Armavir', label: t('Armavir') },
  { key: 'Gegharkunik', label: t('Gegharkunik') },
  { key: 'Kotayk', label: t('Kotayk') },
  { key: 'Lori', label: t('Lori') },
  { key: 'Shirak', label: t('Shirak') },
  { key: 'Syunik', label: t('Syunik') },
  { key: 'Tavush', label: t('Tavush') },
  { key: 'VayotsDzor', label: t('VayotsDzor') }
];

  return (
    <View style={locationStyles.container}>
      {/* Clickable dropdown */}
      <TouchableOpacity
        style={locationStyles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={locationStyles.inputText}>
          { t(`${editUser.profileInfo?.location}`) || 'Select a Region'}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="gray" style={locationStyles.icon} />
      </TouchableOpacity>

      {/* Modal displaying the list of regions */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={locationStyles.modalContainer}>
          <View style={locationStyles.modalContent}>
            <FlatList
              data={regions}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={locationStyles.item}
                  onPress={() => handleSelectRegion(item.key)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocationSelector;

const locationStyles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay for modal
  },
  modalContent: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 8,
    padding: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
