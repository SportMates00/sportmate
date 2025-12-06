// Sort.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';

const Sort = ({ onClose, onSelectSort = () => {} }) => {
    const { theme } = useTheme(); // Get current theme and toggle (if needed) 
    const styles = getStyles(theme);

  const sortOptions = [
    { id: 'date', label: 'Date' },
    { id: 'popularity', label: 'Popularity' },
    { id: 'distance', label: 'Distance' },
  ];

  const [selectedSort, setSelectedSort] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = selectedSort === item.id;
    return (
      <TouchableOpacity
        style={[styles.optionRow, isSelected && styles.optionSelected]}
        onPress={() => setSelectedSort(item.id)}
      >
        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
          {item.label}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#fff"
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sort Events</Text>
      <FlatList
        data={sortOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onSelectSort(selectedSort);
            onClose();
          }}
          style={styles.doneButton}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  doneButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sort;
