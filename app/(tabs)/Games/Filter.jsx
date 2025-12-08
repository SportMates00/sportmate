// Filter.jsx
import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';
// ─────────────────────────────────────────
// FILTER OPTIONS
// ─────────────────────────────────────────
const CITIES_ARMENIA = ['Yerevan','Gyumri','Vanadzor','Abovyan','Hrazdan','Artashat','Vagharshapat','Kapan','Goris','Dilijan',];
const FILTER_OPTIONS = {
  skillLevel: ['Beginner', 'Intermediate', 'Advanced'],
  date: ['Today', 'This Week', 'This Month'],
  // time now has label + range
  time: [
    { label: 'Morning', range: '6AM - 12PM' },
    { label: 'Afternoon', range: '12PM - 6PM' },
    { label: 'Evening', range: '6PM - 10PM' },
    { label: 'Late Night', range: '10PM - 6AM' },
  ],
  location: CITIES_ARMENIA, // multi-select
};

const Filter = ({ onClose, onApplyFilters = () => {}, currentFilters }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // MULTI-SELECT STATE
  const [selectedFilters, setSelectedFilters] = useState(currentFilters);
  useEffect(() => {
   setSelectedFilters(currentFilters);
}, [currentFilters]);


  // Toggle logic (add/remove from selected array)
  const toggleSelect = (group, option) => {
    setSelectedFilters(prev => {
      const exists = prev[group].includes(option);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter(x => x !== option)
          : [...prev[group], option],
      };
    });
  };

  const handleClear = () => {
    setSelectedFilters({
      skillLevel: [],
      location: [],
      date: [],
      time: [],
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Filter Events</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {Object.keys(FILTER_OPTIONS).map(group => (
          <View key={group} style={styles.group}>
            <Text style={styles.groupLabel}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </Text>

            {/* TIME: horizontal cards with ranges */}
            {group === 'time' ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {FILTER_OPTIONS.time.map(slot => {
                  const isSelected = selectedFilters.time.includes(slot.label);
                  return (
                    <TouchableOpacity
                      key={slot.label}
                      onPress={() => toggleSelect('time', slot.label)}
                      style={[
                        styles.timeBox,
                        isSelected && styles.timeBoxSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeText,
                          isSelected && styles.timeTextSelected,
                        ]}
                      >
                        {slot.label}
                      </Text>
                      <Text
                        style={[
                          styles.timeRange,
                          isSelected && styles.timeRangeSelected,
                        ]}
                      >
                        {slot.range}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (
              // OTHER GROUPS: vertical list
              FILTER_OPTIONS[group].map(option => {
                const isSelected = selectedFilters[group].includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionRow,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => toggleSelect(group, option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>

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
              })
            )}
          </View>
        ))}
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => {
            onApplyFilters(selectedFilters);
            onClose();
          }}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────

const getStyles = theme =>
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

    group: {
      marginBottom: 25,
    },
    groupLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },

    // Vertical options
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
      fontSize: 14,
      color: '#333',
    },
    optionTextSelected: {
      color: '#fff',
      fontWeight: 'bold',
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

    // Time boxes
    timeBox: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#f2f2f2',
      borderRadius: 12,
      marginRight: 10,
      minWidth: 130,
    },
    timeBoxSelected: {
      backgroundColor: theme.colors.primary,
    },
    timeText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
    },
    timeTextSelected: {
      color: '#fff',
    },
    timeRange: {
      fontSize: 12,
      color: '#666',
      marginTop: 3,
    },
    timeRangeSelected: {
      color: '#fff',
    },

    // Footer buttons
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

export default Filter;
