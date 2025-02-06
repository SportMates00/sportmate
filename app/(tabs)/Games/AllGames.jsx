// AllGames.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import SportsFilter from './SportsFilter';
import Sort from './Sort';
import Filter from './Filter';
import Events from './Events';

const AllGames = () => {
  const [showSports, setShowSports] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <View style={styles.container}>
      {/* Nested Filter Tabs */}
      <View style={styles.nestedTabsContainer}>
        <TouchableOpacity style={styles.nestedTab} onPress={() => setShowSports(true)}>
          <Text style={styles.nestedTabText}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nestedTab} onPress={() => setShowSort(true)}>
          <Text style={styles.nestedTabText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nestedTab} onPress={() => setShowFilter(true)}>
          <Text style={styles.nestedTabText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Modals for the Nested Tabs */}
      <Modal
        visible={showSports}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSports(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SportsFilter onClose={() => setShowSports(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSort}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSort(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Sort onClose={() => setShowSort(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFilter}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Filter onClose={() => setShowFilter(false)} />
          </View>
        </View>
      </Modal>

      {/* Events List */}
      <Events />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nestedTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 10,
  },
  nestedTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
  },
  nestedTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default AllGames;
