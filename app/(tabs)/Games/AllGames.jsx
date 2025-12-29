// AllGames.jsx
import React, { useState, useCallback, useMemo, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import SportsFilter from "./SportsFilter";
import Sort from "./Sort";
import Filter from "./Filter";
import GameEvents from "./GameEvents";

import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const AllGames = ({ loggedUser, games }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const navigation = useNavigation();

  
  /* ---------------- UI STATE ---------------- */
  const [showSports, setShowSports] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedSports, setSelectedSports] = useState(() =>
    loggedUser?.profileInfo?.mainSport
      ? [loggedUser.profileInfo.mainSport]
      : []
  );

  const [selectedSort, setSelectedSort] = useState(null);

  const [filters, setFilters] = useState({
    skillLevel: [],
    location: [],
    date: [],
    time: [],
  });

  /* ---------------- FILTERED EVENTS ---------------- */
  const gameEvents = useMemo(() => {
    if (!Array.isArray(games)) return [];

    let events = [...games];

    
    // SPORT FILTER
    if (selectedSports.length > 0) {
      events = events.filter((g) =>
        selectedSports.includes(g.sportName)
      );
    }

    // LEVEL FILTER
    if (filters.skillLevel.length > 0) {
      events = events.filter((g) =>
        Array.isArray(g.level)
          ? g.level.some((l) => filters.skillLevel.includes(l))
          : filters.skillLevel.includes(g.level)
      );
    }

    // LOCATION FILTER
    if (filters.location.length > 0) {
      events = events.filter((g) =>
        filters.location.includes(g.venue?.city || g.city)
      );
    }

    // DATE FILTER
    if (filters.date.length > 0) {
      const now = new Date();

      events = events.filter((g) => {
        if (!g.date) return false;
        const eventDate = new Date(g.date);

        return filters.date.some((selected) => {
          if (selected === "Today") {
            return eventDate.toDateString() === now.toDateString();
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

    // TIME FILTER
    if (filters.time.length > 0) {
      events = events.filter((g) => {
        if (!g.time) return false;

        const raw = g.time.toLowerCase().trim();
        const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
        if (isNaN(num)) return false;

        const isPM = raw.includes("pm");
        const isAM = raw.includes("am");

        let hour24 = num;
        if (isPM && num !== 12) hour24 = num + 12;
        if (isAM && num === 12) hour24 = 0;

        return filters.time.some((slot) => {
          if (slot === "morning") return hour24 >= 6 && hour24 < 12;
          if (slot === "afternoon") return hour24 >= 12 && hour24 < 18;
          if (slot === "evening") return hour24 >= 18 && hour24 < 22;
          if (slot === "latenight") return hour24 >= 22 || hour24 < 6;
          return false;
        });
      });
    }

    // SORT
    if (selectedSort === "date") {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (selectedSort === "popularity") {
      events.sort(
        (a, b) => (b.players?.length || 0) - (a.players?.length || 0)
      );
    }

    if (selectedSort === "distance") {
      const userCity =
        loggedUser?.profileInfo?.location?.toLowerCase() || "";

      events.sort((a, b) => {
        const aMatch = a.city?.toLowerCase() === userCity;
        const bMatch = b.city?.toLowerCase() === userCity;
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    return events;
  }, [games, selectedSports, selectedSort, filters, loggedUser]);

  /* ---------------- MODAL HANDLERS ---------------- */
  const openSportsModal = useCallback(() => setShowSports(true), []);
  const closeSportsModal = useCallback(() => setShowSports(false), []);

  const openSortModal = useCallback(() => setShowSort(true), []);
  const closeSortModal = useCallback(() => setShowSort(false), []);

  const openFilterModal = useCallback(() => setShowFilter(true), []);
  const closeFilterModal = useCallback(() => setShowFilter(false), []);

  /* ---------------- RENDER ---------------- */
  return (
    <View style={styles.container}>
      {/* FILTER TABS */}
      <View style={styles.nestedTabsContainer}>
        <TouchableOpacity style={styles.nestedTab} onPress={openSportsModal}>
          <Text style={styles.nestedTabText}>{t("Sports")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openSortModal}>
          <Text style={styles.nestedTabText}>{t("Sort")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nestedTab} onPress={openFilterModal}>
          <Text style={styles.nestedTabText}>{t("Filter")}</Text>
        </TouchableOpacity>
      </View>

      {/* SPORTS MODAL */}
      <Modal visible={showSports} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeSportsModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
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

      {/* SORT MODAL */}
      <Modal visible={showSort} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeSortModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Sort
                  currentSort={selectedSort}
                  onSelectSort={setSelectedSort}
                  onClose={closeSortModal}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* FILTER MODAL */}
      <Modal visible={showFilter} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeFilterModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
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

      {/* EVENTS */}
      <ScrollView>
        <MemoizedGameEvents gameEvents={gameEvents} />
      </ScrollView>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateGameComponent")}
      >
        <Text style={styles.createButtonText}>{t("CreateGame")}</Text>
      </TouchableOpacity>
    </View>
  );
};

/* ---------------- MEMO ---------------- */
const MemoizedGameEvents = memo(({ gameEvents }) => (
  <GameEvents gameEvents={gameEvents} />
));

/* ---------------- STYLES ---------------- */
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    nestedTabsContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },

    nestedTab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: "center",
    },

    nestedTabText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: "500",
      fontFamily: theme.fonts.family,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },

    modalContent: {
      height: "60%",
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },

    createButton: {
      position: "absolute",
      bottom: 10,
      left: 65,
      right: 65,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
    },

    createButtonText: {
      color: theme.colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: theme.fonts.family,
    },
  });

export default AllGames;
