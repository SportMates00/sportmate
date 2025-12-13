import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/src/theme/themeContext';

const LocationSelector = ({ editUser, setEditUser }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleSelectRegion = (region) => {
    setEditUser((prev) => ({
      ...prev,
      profileInfo: { ...prev.profileInfo, location: region },
    }));
    setModalVisible(false);
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
    <View style={styles.container}>
      {/* Clickable dropdown */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.inputText}>
          {t(`${editUser.profileInfo?.location}`) || 'Select a Region'}
        </Text>
        <Icon
          name="arrow-drop-down"
          size={24}
          color={theme.colors.text}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={regions}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelectRegion(item.key)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
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

const getStyles = (theme) => StyleSheet.create({
  container: {
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 16,
    letterSpacing: 1,
    color: theme.colors.primary,
    fontFamily: theme.fonts.family,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: theme.colors.background,
    width: 300,
    borderRadius: 8,
    padding: 12,
  },

  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
  },

  itemText: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },
});
