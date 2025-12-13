import React, { useState, useLayoutEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';

const Players = () => {
  const navigation = useNavigation();

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchText, setSearchText] = useState('');

  const filterOptions = {
    Sport: ['Football', 'Basketball', 'Tennis'],
    Level: ['Beginner', 'Intermediate', 'Advanced'],
    Location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'],
    Availability: ['Morning', 'Evening', 'Night'],
  };

  const players = [
    {
      id: 1,
      name: 'Jacob Jones',
      location: 'New York, NY',
      sports: ['Football'],
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Kristin Watson',
      location: 'Los Angeles, CA',
      sports: ['Tennis', 'Basketball'],
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Wade Warren',
      location: 'Chicago, IL',
      sports: ['Tennis'],
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    { id: 4, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 5, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 6, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 7, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 8, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 9, name: 'Wade Warren', location: 'Chicago, IL', sports: ['Tennis'], image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerBackButtonDisplayMode: 'minimal',
      headerBackTitleVisible: false,
      headerBackTitle: '',
      headerLeft: () => (
        <Text style={styles.title}>Players</Text>
      ),
      headerRight: () => (
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <TouchableOpacity>
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
      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation, theme]);

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
    setActiveFilter(null);
  };

  const removeFilter = (filterType) => {
    const updated = { ...selectedFilters };
    delete updated[filterType];
    setSelectedFilters(updated);
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesSport = !selectedFilters.Sport || player.sports.includes(selectedFilters.Sport);
    const matchesLocation =
      !selectedFilters.Location || player.location === selectedFilters.Location;
    return matchesSearch && matchesSport && matchesLocation;
  });

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchFilterContainer}>
        <TextInput
          placeholder="Search players..."
          placeholderTextColor={theme.colors.text}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />

        <View style={styles.filters}>
          {Object.keys(filterOptions).map((type) => (
            <View key={type} style={styles.filterGroup}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilters[type] && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(type)}
              >
                <Text style={styles.filterText}>
                  {selectedFilters[type] || type}
                </Text>
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

      {/* Modal */}
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

      {/* Players */}
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
              <MaterialIcons
                name="person-add"
                size={24}
                color={theme.colors.buttonText}
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => navigation.navigate('Invite')}
        >
          <Text style={styles.inviteText}>Invite Friends</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Players;

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 50,
      paddingHorizontal: 15,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },

    icon: {
      fontSize: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    profilePic: {
      width: 35,
      height: 35,
      borderRadius: 20,
    },

    searchFilterContainer: {
      marginBottom: 15,
    },

    searchInput: {
      height: 40,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.family,
    },

    filters: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },

    filterGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.text,
    },

    filterButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    filterText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    clearText: {
      marginLeft: 5,
      color: theme.colors.error,
      fontSize: 16,
      fontFamily: theme.fonts.family,
    },

    playersList: {
      marginTop: 10,
    },

    playerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.text,
    },

    playerImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },

    playerInfo: {
      flex: 1,
    },

    playerName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    playerLocation: {
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    playerSports: {
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    addFriendButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 5,
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
      zIndex: 999,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    inviteText: {
      color: theme.colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: theme.fonts.family,
    },

    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      width: '80%',
      borderRadius: 10,
    },

    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    modalItem: {
      paddingVertical: 10,
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    modalClose: {
      marginTop: 15,
      color: theme.colors.primary,
      textAlign: 'center',
      fontFamily: theme.fonts.family,
    },
  });
