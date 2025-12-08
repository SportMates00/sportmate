import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';

const SPORTS_LIST = [
  { id: '1', name: 'Football', icon: 'football-outline' },
  { id: '2', name: 'Basketball', icon: 'basketball-outline' },
  { id: '3', name: 'Tennis', icon: 'tennisball-outline' },
  { id: '4', name: 'Cricket', icon: 'baseball-outline' },
  { id: '5', name: 'Volleyball', icon: 'barbell-outline' },
  { id: '6', name: 'Baseball', icon: 'baseball-outline' },
];

const Sports = ({ selectedSports, setSelectedSports, onClose }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const toggleSport = (sportName) => {
    setSelectedSports((prev) =>
      prev.includes(sportName)
        ? prev.filter((s) => s !== sportName)
        : [...prev, sportName]
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Filter by sport</Text>
        <TouchableOpacity onPress={() => setSelectedSports([])}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE LIST */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {SPORTS_LIST.map((item) => {
          const isSelected = selectedSports.includes(item.name);

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => toggleSport(item.name)}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
                <Text style={styles.rowText}>{item.name}</Text>
              </View>

              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
           onPress={onClose}
        >
          <Text style={styles.applyText}>Apply</Text>
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

    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    rowText: {
      marginLeft: 12,
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

export default Sports;
