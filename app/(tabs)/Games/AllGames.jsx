// AllGames.jsx
import React, { useEffect, useState , useCallback, useMemo, memo} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import SportsFilter from './SportsFilter';
import Sort from './Sort';
import Filter from './Filter';
import GameEvents from './GameEvents';
import { gamesEvents } from '@/src/js files/gamesEvents';

const AllGames = ({ loggedUser }) => {
  const [showSports, setShowSports] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSports, setSelectedSports] = useState([loggedUser.profileInfo.sport]);

  // Memoize gameEvents so it only updates when selectedSports or gamesEvents change
  const gameEvents = useMemo(() => {
    if (!loggedUser?.profileInfo?.sport) return [];
    return selectedSports.flatMap(sport => gamesEvents[sport.toLowerCase()] || []);
  }, [loggedUser, gamesEvents, selectedSports]);

  // Prevent functions from re-creating on each render
  const openSportsModal = useCallback(() => setShowSports(true), []);
  const closeSportsModal = useCallback(() => setShowSports(false), []);
  const openSortModal = useCallback(() => setShowSort(true), []);
  const closeSortModal = useCallback(() => setShowSort(false), []);
  const openFilterModal = useCallback(() => setShowFilter(true), []);
  const closeFilterModal = useCallback(() => setShowFilter(false), []);

  return (
    <View style={styles.container}>
      {/* Nested Filter Tabs */}
      <View style={styles.nestedTabsContainer}>
        <TouchableOpacity style={styles.nestedTab} onPress={openSportsModal}>
          <Text style={[styles.nestedTabText, { borderRightWidth: 1, borderRightColor: 'lightgrey' }]}>
            Sportsss
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openSortModal}>
          <Text style={[styles.nestedTabText, { borderRightWidth: 1, borderRightColor: 'lightgrey' }]}>
            Sort
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openFilterModal}>
          <Text style={styles.nestedTabText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Modals for the Nested Tabs */}
      <Modal visible={showSports} animationType="slide" transparent onRequestClose={closeSportsModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SportsFilter loggedUser={loggedUser} selectedSports={selectedSports} setSelectedSports={setSelectedSports} onClose={closeSportsModal} />
          </View>
        </View>
      </Modal>

      <Modal visible={showSort} animationType="slide" transparent onRequestClose={closeSortModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Sort onClose={closeSortModal} />
          </View>
        </View>
      </Modal>

      <Modal visible={showFilter} animationType="slide" transparent onRequestClose={closeFilterModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Filter onClose={closeFilterModal} />
          </View>
        </View>
      </Modal>

      {/* Events List */}
      <ScrollView>
        <MemoizedGameEvents gameEvents={gameEvents} />
      </ScrollView>
      
      <TouchableOpacity style={styles.createButton} onPress={() => alert("Go to Create Game screen")}>
         <Text style={styles.createButtonText}>Create a Game</Text>
      </TouchableOpacity>

    </View>
  );
};

// Memoized GameEvents component to prevent unnecessary re-renders
const MemoizedGameEvents = memo(({ gameEvents }) => {
  return <GameEvents gameEvents={gameEvents} />;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nestedTabsContainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  marginBottom: 10,
},

nestedTab: {
  flex: 1, // Makes each tab take equal space
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 15,
},

nestedTabText: {
  color: 'black',
  textAlign: 'center',
  fontSize: 14,
  fontWeight: '500',
  width:'100%'
},

borderRight: {
  borderRightWidth: 1,
  borderRightColor: 'lightgrey',
},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  createButton: {
  position: 'absolute',
  bottom: 10,
  left: 65,
  right: 65,
  backgroundColor: 'rgba(36, 163, 76, 0.9)',
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  zIndex: 999,
  
},

createButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});

export default AllGames;
