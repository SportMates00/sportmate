// Sports.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Sports = ({ onClose, onSelectSport = () => {} }) => {
  const [selectedSports, setSelectedSports] = useState([]);

  // Dummy list of sports
  const sportsList = [
    { id: '1', name: 'Football' },
    { id: '2', name: 'Basketball' },
    { id: '3', name: 'Tennis' },
    { id: '4', name: 'Cricket' },
    { id: '5', name: 'Volleyball' },
    { id: '6', name: 'Baseball' },
  ];

  // Mapping sport names to icons (using Ionicons; adjust names as needed)
  const sportIcons = {
    Football: 'football-outline',
    Basketball: 'basketball-outline',
    Tennis: 'tennisball-outline',
    Cricket: 'baseball-outline',
    Volleyball: 'barbell-outline',
    Baseball: 'baseball-outline',
  };

  const toggleSportSelection = (sportName) => {
    if (selectedSports.includes(sportName)) {
      setSelectedSports(selectedSports.filter((s) => s !== sportName));
    } else {
      setSelectedSports([...selectedSports, sportName]);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedSports.includes(item.name);
    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.itemSelected]}
        onPress={() => toggleSportSelection(item.name)}
      >
        <View style={styles.itemLeft}>
          <Ionicons
            name={sportIcons[item.name] || 'ios-star-outline'}
            size={24}
            color={isSelected ? '#fff' : '#1E90FF'}
          />
          <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
            {item.name}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.checkIcon} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Clear Button */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Select Your Favorite Sports</Text>
        <TouchableOpacity onPress={() => setSelectedSports([])}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sportsList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Buttons: Cancel on the left, Done on the right */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onSelectSport(selectedSports);
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
  },
  clearText: {
    fontSize: 16,
    color: '#1E90FF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
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
  itemSelected: {
    backgroundColor: '#1E90FF',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  itemTextSelected: {
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
    backgroundColor: '#1E90FF',
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
