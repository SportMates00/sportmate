// AllGames.jsx
import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import SportsFilter from './SportsFilter';
import Sort from './Sort';
import Filter from './Filter';
import GameEvents from './GameEvents';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import {useNavigation } from "@react-navigation/native";

const AllGames = ({ loggedUser, games, addGame }) => {
  const [showSports, setShowSports] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
   const navigation = useNavigation();
  const [selectedSports, setSelectedSports] = useState([
    loggedUser.profileInfo.mainSport,
  ]);
  const [selectedSort, setSelectedSort] = useState(null);

  const [filters, setFilters] = useState({
    skillLevel: [],
    location: [],
    date: [],
    time: [],
  });

  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  const gameEvents = useMemo(() => {
    if (!loggedUser?.profileInfo?.mainSport) return [];

    let events = games.filter(
  game =>
    selectedSports.includes(game.sport)
);


    if (filters.skillLevel.length > 0) {
      events = events.filter(e => filters.skillLevel.includes(e.level));
    }

    if (filters.location.length > 0) {
      events = events.filter(e => filters.location.includes(e.city));
    }

    if (filters.date.length > 0) {
      const now = new Date();

      events = events.filter(e => {
        const eventDate = new Date(e.date);

        return filters.date.some(selected => {
          if (selected === 'Today') {
            return eventDate.toDateString() === now.toDateString();
          }
          if (selected === 'This Week') {
            const diff = eventDate - now;
            return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
          }
          if (selected === 'This Month') {
            return (
              eventDate.getMonth() === now.getMonth() &&
              eventDate.getFullYear() === now.getFullYear()
            );
          }
          return false;
        });
      });
    }

    if (filters.time.length > 0) {
      events = events.filter(e => {
        if (!e.time) return false;

        let raw = e.time.toLowerCase().trim();
        let num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
        if (isNaN(num)) return false;

        const isPM = raw.includes('pm');
        const isAM = raw.includes('am');

        let hour24 = num;
        if (isPM && num !== 12) hour24 = num + 12;
        if (isAM && num === 12) hour24 = 0;

        return filters.time.some(slot => {
          if (slot === 'morning') return hour24 >= 6 && hour24 < 12;
          if (slot === 'afternoon') return hour24 >= 12 && hour24 < 18;
          if (slot === 'evening') return hour24 >= 18 && hour24 < 22;
          if (slot === 'latenight') return hour24 >= 22 || hour24 < 6;
          return false;
        });
      });
    }

    if (selectedSort === 'date') {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (selectedSort === 'popularity') {
      events.sort(
        (a, b) => (b.players?.length || 0) - (a.players?.length || 0)
      );
    }

    if (selectedSort === 'distance') {
      const userCity =
        loggedUser?.profileInfo?.location?.toLowerCase() || '';

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

  const openSportsModal = useCallback(() => setShowSports(true), []);
  const closeSportsModal = useCallback(() => setShowSports(false), []);
  const openSortModal = useCallback(() => setShowSort(true), []);
  const closeSortModal = useCallback(() => setShowSort(false), []);
  const openFilterModal = useCallback(() => setShowFilter(true), []);
  const closeFilterModal = useCallback(() => setShowFilter(false), []);

  return (
    <View style={styles.container}>
      {/* Nested filter tabs */}
      <View style={styles.nestedTabsContainer}>
        <TouchableOpacity style={styles.nestedTab} onPress={openSportsModal}>
          <Text style={styles.nestedTabText}>{t('Sports')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openSortModal}>
          <Text style={styles.nestedTabText}>{t('Sort')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openFilterModal}>
          <Text style={styles.nestedTabText}>{t('Filter')}</Text>
        </TouchableOpacity>
      </View>

      {/* Sports modal */}
      <Modal
        visible={showSports}
        animationType="slide"
        transparent
        onRequestClose={closeSportsModal}
      >
        <TouchableWithoutFeedback onPress={closeSportsModal}>
          <View style={styles.modalOverlay}>
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

      {/* Sort modal */}
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

      {/* Filter modal */}
      <Modal
        visible={showFilter}
        animationType="slide"
        transparent
        onRequestClose={closeFilterModal}
      >
        <TouchableWithoutFeedback onPress={closeFilterModal}>
          <View style={styles.modalOverlay}>
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

      <ScrollView>
        <MemoizedGameEvents gameEvents={gameEvents} />
      </ScrollView>

      <TouchableOpacity
          style={styles.createButton}
          onPress={() =>
            navigation.navigate('CreateGame', { addGame, loggedUser, })}>
        <Text style={styles.createButtonText}>
          {t('CreateGame')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MemoizedGameEvents = memo(({ gameEvents }) => {
  return <GameEvents gameEvents={gameEvents} />;
});

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    nestedTabsContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      marginBottom: 10,
    },

    nestedTab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
    },

    nestedTabText: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      width: '100%',
      fontFamily: theme.fonts.family,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },

    modalContent: {
      height: '60%',
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },

    createButton: {
      position: 'absolute',
      bottom: 10,
      left: 65,
      right: 65,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      zIndex: 999,
    },

    createButtonText: {
      color: theme.colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: theme.fonts.family,
    },
  });

export default AllGames;
