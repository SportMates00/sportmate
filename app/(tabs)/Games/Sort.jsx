// Sort.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';

// ⭐ FIXED: added currentSort prop ⭐
const Sort = ({ onClose, onSelectSort = () => {}, currentSort }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const SORT_OPTIONS = [
  { key: 'date', label: t('SortGamesbyDate') },
  { key: 'popularity', label: t('SortGamesbyPopularity') },
  { key: 'distance', label: t('SortGamesbyDistance') },
];

  // ⭐ FIXED: initial state now uses currentSort ⭐
  const [selectedSort, setSelectedSort] = useState(currentSort || null);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('SortGamesEvents')}</Text>
        <TouchableOpacity onPress={() => setSelectedSort(null)}>
          <Text style={styles.clearText}>{t('ClearSortingGames')}</Text>
        </TouchableOpacity>
      </View>

      {/* OPTIONS */}
      <ScrollView style={{ flex: 1 }}>
        {SORT_OPTIONS.map((option) => {
          const isSelected = selectedSort === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              style={styles.row}
              onPress={() => setSelectedSort(option.key)}
            >
              <Text style={styles.rowText}>{option.label}</Text>

              <View
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>{t('CancelSortGamesButton')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => {
            onSelectSort(selectedSort);
            onClose();
          }}
        >
          <Text style={styles.applyText}>{t('DoneSortGamesButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },

    headerText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#333',
    },

    clearText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '500',
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },

    rowText: {
      fontSize: 16,
      color: '#333',
    },

    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },

    checkboxSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    cancelBtn: {
      flex: 1,
      backgroundColor: '#eee',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginRight: 10,
    },

    applyBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginLeft: 10,
    },

    cancelText: {
      color: '#333',
      fontSize: 16,
      fontWeight: '500',
    },

    applyText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default Sort;
