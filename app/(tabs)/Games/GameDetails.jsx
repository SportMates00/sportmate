import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";

const GameDetails = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <ImageBackground
        source={require("../../../assets/images/football-field.webp")}
        style={styles.header}
      >
        {/* BACK */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* TITLE + DATE/TIME */}
        <View style={styles.titleNameOverlay}>
          <Text style={styles.title}>User's tennis game</Text>
          <Text style={styles.subTitle}>Tomorrow · 09:00</Text>
        </View>

        {/* BADGES */}
        <View style={styles.headerBadges}>
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={14} color="#fff" />
            <Text style={styles.badgeText}>Verified users only</Text>
          </View>

          <View style={[styles.badge, styles.courtBadge]}>
            <Ionicons name="grid-outline" size={14} color="#fff" />
            <Text style={styles.badgeText}>Court booked</Text>
          </View>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* PLAYERS */}
        <Text style={styles.sectionTitle}>Players</Text>
        <View style={styles.playersRow}>
          <View style={styles.player}>
            <View style={styles.avatar} />
            <Text style={styles.playerName}>Huei</Text>
          </View>

          <View style={[styles.avatar, styles.emptyAvatar]} />
        </View>

        {/* SPORT */}
        <View style={styles.infoRow}>
          <Ionicons name="football-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Sport</Text>
            <Text style={styles.infoValue}>Tennis</Text>
          </View>
        </View>

        {/* LEVEL */}
        <View style={styles.infoRow}>
          <Ionicons name="stats-chart-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Match level</Text>
            <Text style={styles.infoValue}>Upper Intermediate, Advanced</Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>DSQ Gym & Health Club</Text>
            <Text style={styles.infoSubValue}>
              12 Komitas Ave, Yerevan, Armenia
            </Text>
          </View>
        </View>
        {/* Eligibilaty */}
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Eligibility</Text>
            <Text style={styles.infoValue}>Womens Only</Text>
          </View>
        </View>
        {/* Court Booked */}
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Booked</Text>
          </View>
        </View>

        {/* DATE & TIME */}
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} style={styles.infoLabel} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Date & Time</Text>
            <Text style={styles.infoValue}>Tomorrow · 09:00 – 11:00</Text>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.notesBox}>
          <View style={styles.notesHeader}>
            <Ionicons name="document-text-outline" size={20} style={styles.infoLabel} />
            <Text style={styles.notesLabel}>Notes</Text>
          </View>
          <Text style={styles.notesText}>
            Friendly practice game. Bring your own racket and water.
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatBtn}>
          <Text style={styles.chatText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinText}>Ask to join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    header: {
      height: 220,
    },

    backBtn: {
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 10,
    },
     titleNameOverlay: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 10,
      backgroundColor: "rgba(0,0,0,0.35)",
      borderRadius: 10,
      padding: 10,
    },
    title: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "800",
      fontFamily: theme.fonts.family,
    },
    subTitle: {
      color: theme.colors.text,
      marginTop: 6,
      fontFamily: theme.fonts.family
    },

    headerBadges: {
      position: "absolute",
      Top: 20,
      right: 16,
      alignItems: "flex-end",
      gap: 6,
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
      gap: 6,
    },

    courtBadge: {
      backgroundColor: theme.colors.primary,
    },

    badgeText: {
      color: theme.colors.text,
      fontSize: 12,
      fontWeight: "600",
    },

    content: {
      padding: 16,
      paddingBottom: 120,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
    },

    playersRow: {
      flexDirection: "row",
      marginBottom: 20,
    },

    player: {
      alignItems: "center",
      marginRight: 16,
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#ccc",
      marginBottom: 6,
    },

    emptyAvatar: {
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "#ccc",
      backgroundColor: "transparent",
    },

    playerName: {
      color: theme.colors.text,
      fontSize: 12,
    },

    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 18,
    },

    infoText: {
      marginLeft: 12,
    },

    infoLabel: {
      fontSize: 14,
      color: "#777",
      color: theme.colors.text,
      fontWeight: "500"
    },

    infoValue: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "100",
    },

    infoSubValue: {
      fontSize: 12,
      color: theme.colors.text,
      marginTop: 2,
      fontWeight: "100"
    },

    notesBox: {
      marginTop: 10,
    },

    notesHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 6,
    },

    notesLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },

    notesText: {
      fontSize: 14,
      color: "#555",
      color: theme.colors.text,
      fontWeight: '100'
    },

    bottomBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderColor: "#eee",
    },

    chatBtn: {
      flex: 1,
      backgroundColor: "#eee",
      padding: 14,
      borderRadius: 8,
      marginRight: 10,
      alignItems: "center",
    },

    joinBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      padding: 14,
      borderRadius: 8,
      alignItems: "center",
    },

    chatText: {
      fontWeight: "600",
    },

    joinText: {
      color: "#fff",
      fontWeight: "600",
    },
  });

export default GameDetails;
