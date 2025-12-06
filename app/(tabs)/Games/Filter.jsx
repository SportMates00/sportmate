// Filter.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';
const Filter = ({ onClose, onApplyFilters = () => {} }) => {
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
    const styles = getStyles(theme);
  // Maintain a selection per filter group (single selection per group)
  const [selectedFilters, setSelectedFilters] = useState({
    skillLevel: null,
    location: null,
    date: null,
  });

  const filterOptions = {
    skillLevel: ['Beginner', 'Intermediate', 'Advanced'],
    location: ['Nearby', 'City', 'Country'],
    date: ['Today', 'This Week', 'This Month'],
  };

  const handleSelect = (group, option) => {
    setSelectedFilters({ ...selectedFilters, [group]: option });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Filter Events</Text>
      {Object.keys(filterOptions).map((group) => (
        <View key={group} style={styles.filterGroup}>
          <Text style={styles.filterTitle}>
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </Text>
          {filterOptions[group].map((option) => {
            const isSelected = selectedFilters[group] === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionRow, isSelected && styles.optionSelected]}
                onPress={() => handleSelect(group, option)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option}
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
          })}
        </View>
      ))}
      {/* Bottom Buttons: Cancel on the left, Done on the right */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onApplyFilters(selectedFilters);
            onClose();
          }}
          style={styles.doneButton}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    fontSize: 16,
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

export default Filter;
