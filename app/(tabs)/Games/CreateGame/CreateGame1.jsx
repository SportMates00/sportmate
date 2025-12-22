import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { gamesTable } from "./GamesData";

const CreateGame1 = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  /* ---------- SPORTS ---------- */
  const SPORTS = Object.keys(gamesTable).map((key) => ({
    key,
    label: gamesTable[key].sportName,
    icon: gamesTable[key].sportIcon,
  }));

  const [sport, setSport] = useState(SPORTS[0]?.key || null);

  /* ---------- VENUES ---------- */
  const venues = useMemo(() => {
    if (!sport) return [];
    return gamesTable[sport]?.stadiums || [];
  }, [sport]);

  const [selectedVenue, setSelectedVenue] = useState(null);

  // Auto-select first venue when sport changes
  useEffect(() => {
    if (venues.length) setSelectedVenue(venues[0]);
    else setSelectedVenue(null);
  }, [venues]);

  return (
    <View style={styles.page}>
      {/* ================= SPORT ================= */}
      <Text style={styles.sectionTitle}>Select a sport</Text>

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
              style={[styles.choiceCard, active && styles.choiceCardActive, {flexDirection:'row',justifyContent: "flex=start",alignItems:'center',gap:5}]}
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
      <Text style={styles.sectionTitle}>Location</Text>

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
            <Image
              source={require("@/assets/images/football-field.webp")}
              style={styles.venueImage}
            />
            <View style={styles.venueNameOverlay}>
              <Text style={styles.venueName}>
                {selectedVenue.stadiumName}
              </Text>
              <Text style={styles.venueCity}>
                {selectedVenue.city} · {selectedVenue.location}
              </Text>
            </View>
          </View>

          <View style={styles.venueMetaRow}>
            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>Hours</Text>
              <Text style={styles.venueMetaValue}>
                {selectedVenue.hours}
              </Text>
            </View>

            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>Price / hour</Text>
              <Text style={styles.venueMetaValue}>
                {selectedVenue.price}
              </Text>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            Prices may vary depending on venue availability.
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
      backgroundColor: "#fff",
      justifyContent: "space-between",
    },

    choiceCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
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
      backgroundColor: "#fff",
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

 
  });
