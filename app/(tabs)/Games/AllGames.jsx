// AllGames.jsx
import React, { useEffect, useState , useCallback, useMemo, memo} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import SportsFilter from './SportsFilter';
import Sort from './Sort';
import Filter from './Filter';
import GameEvents from './GameEvents';
import { gamesEvents } from '@/src/js files/gamesEvents';

const AllGames = ({ loggedUser }) => {
  const [showSports, setShowSports] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSports, setSelectedSports] = useState([loggedUser.profileInfo.sport.key]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [filters, setFilters] = useState({skillLevel: [],location: [],date: [],time: [],});

  // Memoize gameEvents so it only updates when selectedSports or gamesEvents change
 const gameEvents = useMemo(() => {
  if (!loggedUser?.profileInfo?.sport.key) return [];

  // 1️) BASE EVENTS FOR SELECTED SPORTS
  let events = selectedSports.flatMap(
    sport => gamesEvents[sport.toLowerCase()] || []
  );

  // --------------------------
  // 🔥 2️) APPLY FILTERS
  // --------------------------

  // SKILL LEVEL (multi)
  if (filters.skillLevel.length > 0) {
    events = events.filter(e =>
      filters.skillLevel.includes(e.level)
    );
  }

  // LOCATION / CITY (multi)
  if (filters.location.length > 0) {
    events = events.filter(e =>
      filters.location.includes(e.city)
    );
  }

  // DATE FILTER
  if (filters.date.length > 0) {
    const now = new Date();

    events = events.filter(e => {
      const eventDate = new Date(e.date);

      return filters.date.some(selected => {
        if (selected === "Today") {
          return (
            eventDate.toDateString() === now.toDateString()
          );
        }

        if (selected === "This Week") {
          const diff = eventDate - now;
          return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
        }

        if (selected === "This Month") {
          return (
            eventDate.getMonth() === now.getMonth() &&
            eventDate.getFullYear() === now.getFullYear()
          );
        }

        return false;
      });
    });
  }

  // TIME FILTER (multi)
if (filters.time.length > 0) {
  events = events.filter(e => {
    if (!e.time) return false; // ← IGNORE events with no time

    let raw = e.time.toLowerCase().trim();

    // Extract number
    let num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return false;

    // Determine AM/PM
    const isPM = raw.includes("pm");
    const isAM = raw.includes("am");

    let hour24 = num;

    if (isPM && num !== 12) hour24 = num + 12;
    if (isAM && num === 12) hour24 = 0;

    return filters.time.some(slot => {
      if (slot === "Morning") return hour24 >= 6 && hour24 < 12;
      if (slot === "Afternoon") return hour24 >= 12 && hour24 < 18;
      if (slot === "Evening") return hour24 >= 18 && hour24 < 22;
      if (slot === "Late Night") return hour24 >= 22 || hour24 < 2;
    });
  });
}

  // --------------------------
  // 🔥 3️) APPLY SORTING
  // --------------------------

  // SORT: DATE
  if (selectedSort === "date") {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // SORT: POPULARITY
  if (selectedSort === "popularity") {
    events.sort(
      (a, b) => (b.players?.length || 0) - (a.players?.length || 0)
    );
  }

  // SORT: DISTANCE (CITY MATCH)
  if (selectedSort === "distance") {
    const userCity = loggedUser?.profileInfo?.location?.toLowerCase() || "";

    events.sort((a, b) => {
      const aMatch = a.city?.toLowerCase() === userCity;
      const bMatch = b.city?.toLowerCase() === userCity;

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }

  return events;

}, [loggedUser, selectedSports, selectedSort, filters]);



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
    <Modal
  visible={showSports}
  animationType="slide"
  transparent
  onRequestClose={closeSportsModal}
>
  {/* Overlay - closes modal */}
  <TouchableWithoutFeedback onPress={closeSportsModal}>
    <View style={styles.modalOverlay}>
      
      {/* Content - does NOT close modal */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContent}>
          <SportsFilter
            loggedUser={loggedUser}
            selectedSports={selectedSports}
            setSelectedSports={setSelectedSports}
            onClose={closeSportsModal}
           
          />
        </View>
      </TouchableWithoutFeedback>

    </View>
  </TouchableWithoutFeedback>
</Modal>


    <Modal
  visible={showSort}
  animationType="slide"
  transparent
  onRequestClose={closeSortModal}
>
  <TouchableWithoutFeedback onPress={closeSortModal}>
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContent}>
          <Sort
            onClose={closeSortModal}
            onSelectSort={setSelectedSort}
            currentSort={selectedSort} 
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>
    <Modal
  visible={showFilter}
  animationType="slide"
  transparent
  onRequestClose={closeFilterModal}
>
  {/* Overlay closes modal */}
  <TouchableWithoutFeedback onPress={closeFilterModal}>
    <View style={styles.modalOverlay}>

      {/* Content does NOT close modal */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContent}>
          <Filter
            currentFilters={filters}
            onApplyFilters={setFilters}
            onClose={closeFilterModal}
          />
        </View>
      </TouchableWithoutFeedback>

    </View>
  </TouchableWithoutFeedback>
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
