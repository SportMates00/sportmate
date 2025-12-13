import React, { useLayoutEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView,Modal,FlatList} from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const Players = ( ) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchText, setSearchText] = useState('');

  const filterOptions = {
    Sport: ['Football', 'Basketball', 'Tennis'],
    Level: ['Beginner', 'Intermediate', 'Advanced'],
    Location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'],
    Availability: ['Morning', 'Evening', 'Night']
  };

  const players = [
    {
      id: 1,
      name: 'Jacob Jones',
      location: 'New York, NY',
      sports: ['Football'],
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Kristin Watson',
      location: 'Los Angeles, CA',
      sports: ['Tennis', 'Basketball'],
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 5,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 6,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 7,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 8,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 9,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerLeft : () =>      (
        <Text style={styles.title}>Players</Text>
      ),
      headerRight : () =>      (
              <View style={styles.header}>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => {/* navigate to notifications */}}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}> 
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/99.jpg' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>
      </View>

      ),
      // FIXED: No borders, no lines
      headerStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0, // remove line
        elevation: 0,         // Android
        shadowOpacity: 0,     // iOS
      },
    });
  }, [players,navigation]);

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
    setActiveFilter(null);
  };

  const removeFilter = (filterType) => {
    const updated = { ...selectedFilters };
    delete updated[filterType];
    setSelectedFilters(updated);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesSport = !selectedFilters.Sport || player.sports.includes(selectedFilters.Sport);
    const matchesLocation = !selectedFilters.Location || player.location === selectedFilters.Location;
    return matchesSearch && matchesSport && matchesLocation;
  });

  return (
    <View style={styles.container}>
      {/* Header */}


      {/* Search and Filters */}
      <View style={styles.searchFilterContainer}>
        <TextInput
          placeholder="Search players..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <View style={styles.filters}>
          {Object.keys(filterOptions).map((type) => (
            <View key={type} style={styles.filterGroup}>
              <TouchableOpacity
                style={[styles.filterButton, selectedFilters[type] && styles.filterButtonActive]}
                onPress={() => setActiveFilter(type)}
              >
                <Text>{selectedFilters[type] || type}</Text>
              </TouchableOpacity>
              {selectedFilters[type] && (
                <TouchableOpacity onPress={() => removeFilter(type)}>
                  <Text style={styles.clearText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Modal for Selecting Filter Options */}
      <Modal visible={!!activeFilter} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {activeFilter}</Text>
            <FlatList
              data={filterOptions[activeFilter]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleFilterSelect(activeFilter, item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setActiveFilter(null)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Player List */}
      <ScrollView style={styles.playersList}>
        {filteredPlayers.map((player) => (
          <View key={player.id} style={styles.playerCard}>
            <Image source={{ uri: player.image }} style={styles.playerImage} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerLocation}>{player.location}</Text>
              <Text style={styles.playerSports}>{player.sports.join(', ')}</Text>
            </View>
            <TouchableOpacity style={styles.addFriendButton}>
            <MaterialIcons name="person-add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Invite Friends Button */}
        <TouchableOpacity style={styles.inviteButton} onPress={() => navigation.navigate('Invite')}> 
          <Text style={styles.inviteText}>Invite Friends</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
    paddingHorizontal: 15,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  icon: {
    fontSize: 20,
    marginRight: 10
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 20
  },
  searchFilterContainer: {
    marginBottom: 15
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary
  },
  clearText: {
    marginLeft: 5,
    color: 'red',
    fontSize: 16
  },
  playersList: {
    marginTop: 10
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  playerInfo: {
    flex: 1
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  playerLocation: {
    fontSize: 14,
    color: 'gray'
  },
  playerSports: {
    fontSize: 14,
    color: 'gray'
  },
  addFriendButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5
  },
  inviteButton: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: theme.colors.primary,
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  zIndex: 999, // ensure it's above everything
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  },
  inviteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalItem: {
    paddingVertical: 10,
    fontSize: 16
  },
  modalClose: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center'
  }
});

export default Players;
