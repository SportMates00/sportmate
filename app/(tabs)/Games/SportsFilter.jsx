import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
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

const Sports = ({ selectedSports, setSelectedSports, onClose, onSelectSport = () => {} }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const toggleSportSelection = useCallback((sportName) => {
    setSelectedSports((prev) =>
      prev.includes(sportName) ? prev.filter((s) => s !== sportName) : [...prev, sportName]
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    const isSelected = selectedSports.includes(item.name);
    return <SportItem item={item} isSelected={isSelected} onPress={toggleSportSelection} />;
  }, [selectedSports]);

  const Header = ({ onClear }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Filter by Sport</Text>
      <TouchableOpacity onPress={onClear}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );

  const SportItem = memo(({ item, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.itemContainer, isSelected && styles.itemSelected]}
      onPress={() => onPress(item.name)}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={item.icon} size={24} color={isSelected ? '#fff' : theme.colors.primary} />
        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>{item.name}</Text>
      </View>
      {isSelected && <Ionicons name="checkmark-circle" size={24} color="#fff" />}
    </TouchableOpacity>
  ));

  const Footer = ({ onClose, onApply }) => (
    <View style={styles.bottomButtons}>
      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onApply} style={styles.doneButton}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onClear={() => setSelectedSports([])} />
      <FlatList
        data={SPORTS_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Footer onClose={onClose} onApply={() => { onSelectSport(selectedSports); onClose(); }} />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary },
  clearText: { fontSize: 16, color: theme.colors.primary },
  listContainer: { paddingBottom: 20 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemSelected: {
    backgroundColor: theme.colors.primary,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemText: { fontSize: 14, color: '#333', marginLeft: 10 },
  itemTextSelected: { color: '#fff', fontWeight: 'bold' },
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

export default Sports;
