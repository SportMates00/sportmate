import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { gamesTable } from "./GamesData";

const CreateGame1 = ({ loggedUser, draftGame, setDraftGame }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  /* ---------- USER MAIN SPORT ---------- */
  const userMainSport = loggedUser?.profileInfo?.mainSport?.toLowerCase();

  /* ---------- SPORT STATE ---------- */
  const [sport, setSport] = useState(() => {
    if (userMainSport && gamesTable[userMainSport]) {
      return userMainSport;
    }
    return Object.keys(gamesTable)[0] || null;
  });

  // Sync when user changes main sport later
  useEffect(() => {
    if (userMainSport && gamesTable[userMainSport]) {
      setSport(userMainSport);
    }
  }, [userMainSport]);

  // Sync sport into draftGame
  useEffect(() => {
    if (!sport) return;

    setDraftGame((prev) => ({
      ...prev,
      sport,
    }));
  }, [sport, setDraftGame]);

  /* ---------- MAPS ---------- */
  const openMaps = ({ latitude, longitude, stadiumName }) => {
    const label = encodeURIComponent(stadiumName);
    const latLng = `${latitude},${longitude}`;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latLng}`;
    const appleMapsUrl = `http://maps.apple.com/?ll=${latLng}&q=${label}`;

    if (Platform.OS === "ios") {
      Linking.openURL(appleMapsUrl);
    } else {
      Linking.openURL(googleMapsUrl);
    }
  };

  /* ---------- SPORTS LIST (MAIN SPORT FIRST) ---------- */
  const SPORTS = useMemo(() => {
    const base = Object.keys(gamesTable).map((key) => ({
      key,
      label: gamesTable[key].sportName,
      icon: gamesTable[key].sportIcon,
    }));

    if (!userMainSport) return base;

    const mainIndex = base.findIndex(
      (s) => s.key.toLowerCase() === userMainSport
    );

    if (mainIndex === -1) return base;

    const mainSportItem = base[mainIndex];
    const rest = base.filter((_, i) => i !== mainIndex);

    return [mainSportItem, ...rest];
  }, [userMainSport]);

  /* ---------- VENUES ---------- */
  const venues = useMemo(() => {
    if (!sport) return [];
    return gamesTable[sport]?.stadiums || [];
  }, [sport]);

  const [selectedVenue, setSelectedVenue] = useState(null);

  // Auto-select first venue when sport changes
  useEffect(() => {
    if (venues.length) {
      setSelectedVenue(venues[0]);
    } else {
      setSelectedVenue(null);
    }
  }, [venues]);

  // Sync venue into draftGame
  useEffect(() => {
    if (!selectedVenue) return;

    setDraftGame((prev) => ({
      ...prev,
      venue: {
        id: selectedVenue.id,
        stadiumName: selectedVenue.stadiumName,
        city: selectedVenue.city,
        location: selectedVenue.location,
        hours: selectedVenue.hours,
        price: selectedVenue.price,
        latitude: selectedVenue.latitude,
        longitude: selectedVenue.longitude,
      },
    }));
  }, [selectedVenue, setDraftGame]);

  return (
    <View style={styles.page}>
      {/* ================= SPORT ================= */}
      <Text style={styles.sectionTitle}>
        {t("SelectSport")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {SPORTS.map((s) => {
          const active = sport === s.key;
          return (
            <TouchableOpacity
              key={s.key}
              onPress={() => setSport(s.key)}
              style={[
                styles.choiceCard,
                active && styles.choiceCardActive,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 5,
                },
              ]}
            >
              <Ionicons
                name={s.icon}
                size={22}
                color={active ? theme.colors.primary : theme.colors.text}
              />
              <Text style={styles.choiceLabel}>{s.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= LOCATION ================= */}
      <Text style={styles.sectionTitle}>
        {t("Location")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {venues.map((v) => {
          const active = selectedVenue?.id === v.id;
          return (
            <TouchableOpacity
              key={v.id}
              onPress={() => setSelectedVenue(v)}
              style={[styles.choiceCard, active && styles.choiceCardActive]}
            >
              <Text style={styles.venueCardTitle} numberOfLines={2}>
                {v.stadiumName}
              </Text>

              <Text style={styles.venueCardSub}>
                {v.city} · {v.location}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= VENUE PREVIEW ================= */}
      {selectedVenue && (
        <View style={styles.venueCardWrap}>
          <View style={styles.venueImageWrap}>
            <TouchableOpacity
              onPress={() =>
                openMaps({
                  latitude: selectedVenue.latitude,
                  longitude: selectedVenue.longitude,
                  stadiumName: selectedVenue.stadiumName,
                })
              }
            >
              <Image
                source={require("@/assets/images/football-field.webp")}
                style={styles.venueImage}
              />
            </TouchableOpacity>

            <View style={styles.venueNameOverlay}>
              <Text style={styles.venueName}>
                {selectedVenue.stadiumName}
              </Text>
              <Text style={styles.venueCity}>
                {selectedVenue.city} · {selectedVenue.location}
              </Text>
              <View style={styles.mapIcon}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#ffffffff"
                />
              </View>
            </View>
          </View>

          <View style={styles.venueMetaRow}>
            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>
                {t("Hours")}
              </Text>
              <Text style={styles.venueMetaValue}>
                {selectedVenue.hours}
              </Text>
            </View>

            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>
                {t("PricePerHour")}
              </Text>
              <Text style={styles.venueMetaValue}>
                {selectedVenue.price}
              </Text>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            {t("VenuePriceDisclaimer")}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CreateGame1;

/* ======================= STYLES ======================= */

const getStyles = (theme) =>
  StyleSheet.create({
    page: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 120,
      backgroundColor: theme.colors.background,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    hScroll: {
      paddingRight: 16,
      marginBottom: 10,
    },

    choiceCard: {
      width: 160,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 14,
      marginRight: 12,
      backgroundColor: theme.colors.background,
      justifyContent: "space-between",
    },

    choiceCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    choiceLabel: {
      fontWeight: "600",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    venueCardTitle: {
      fontWeight: "800",
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    venueCardSub: {
      marginTop: 6,
      fontSize: 12,
      opacity: 0.7,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    venueCardWrap: {
      marginTop: 16,
    },

    venueImageWrap: {
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: "#eee",
    },

    venueImage: {
      width: "100%",
      height: 190,
      resizeMode: "cover",
    },

    venueNameOverlay: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 10,
      backgroundColor: "rgba(0,0,0,0.35)",
      borderRadius: 10,
      padding: 10,
    },

    venueName: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
      fontFamily: theme.fonts.family,
    },

    venueCity: {
      color: "#fff",
      marginTop: 2,
      fontSize: 12,
      opacity: 0.9,
      fontFamily: theme.fonts.family,
    },

    venueMetaRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },

    venueMetaBox: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#e4e4e4",
      borderRadius: 12,
      padding: 12,
      backgroundColor: theme.colors.background,
    },

    venueMetaLabel: {
      fontSize: 12,
      opacity: 0.7,
      fontWeight: "600",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    venueMetaValue: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: "800",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    disclaimer: {
      marginTop: 10,
      fontSize: 12,
      opacity: 0.65,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    mapIcon: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 6,
      borderRadius: 20,
    },
  });
