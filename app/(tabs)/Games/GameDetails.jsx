import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const GameDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { gameId } = route.params;

  const game = useSelector((state) =>
    state.gameEvents?.events?.find((g) => g.id === gameId)
  );

  // Fallbacks (prevents crash if game missing)
  if (!game) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Game not found</Text>
      </View>
    );
  }

  const formattedDate = new Date(game.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(
    `${game.date}T${game.time}`
  ).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",

      headerBackground: () => (
        <ImageBackground
          source={require("../../../assets/images/football-field.webp")}
          style={styles.header}
        >
          <View style={styles.overlay} />

          {/* TITLE */}
          <View style={styles.titleNameOverlay}>
            <Text style={styles.title}>
              {game.host?.name}'s {game.sportName} game
            </Text>

            <Text style={styles.subTitle}>
              {formattedDate} · {formattedTime}
            </Text>
          </View>

        </ImageBackground>
      ),

      headerTintColor: "#fff",
    });
  }, [navigation, game]);

  return (
    <View style={styles.container}>
      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* PLAYERS */}
        <Text style={styles.sectionTitle}>Players</Text>
        <ScrollView horizontal>
          <View style={styles.playersRow}>
            {game.players?.map((p) => (
              <View key={p.id} style={styles.player}>
                <View style={styles.avatar} />
                <Text style={styles.playerName}>{p.name}</Text>
              </View>
            ))}

            {/* empty slots */}
            {Array.from({
              length: game.maxPlayers - game.players.length,
            }).map((_, i) => (
              <View
                key={`empty-${i}`}
                style={[styles.avatar, styles.emptyAvatar]}
              />
            ))}
          </View>
        </ScrollView>

        {/* SPORT */}
        <View style={styles.infoRow}>
          <Ionicons
            name="football-outline"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Sport</Text>
            <Text style={styles.infoValue}>{game.sportName}</Text>
          </View>
        </View>

        {/* LEVEL */}
        <View style={styles.infoRow}>
          <Ionicons
            name="stats-chart-outline"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Match level</Text>
            <Text style={styles.infoValue}>
              {Array.isArray(game.level) ? game.level.join(", ") : game.level}
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>
              {game?.venue?.stadiumName || "—"}
            </Text>
            <Text style={styles.infoSubValue}>
              {game?.venue?.city}, Armenia
            </Text>
          </View>
        </View>

        {/* ELIGIBILITY */}
        <View style={styles.infoRow}>
          <Ionicons
            name="people-outline"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Eligibility</Text>
            <Text style={styles.infoValue}>
              {game.verifiedOnly ? "Verified users only" : "Open to everyone"}
            </Text>
          </View>
        </View>

        {/* COURT BOOKED */}
        <View style={styles.infoRow}>
          <FontAwesome5
            name="calendar-check"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>
              {game.courtBooked ? "Booked" : "Not booked"}
            </Text>
          </View>
        </View>

        {/* DATE & TIME */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={20}
            style={styles.infoLabel}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Date & Time</Text>
            <Text style={styles.infoValue}>
              {formattedDate} · {formattedTime}
            </Text>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.notesBox}>
          <View style={styles.notesHeader}>
            <Ionicons
              name="document-text-outline"
              size={20}
              style={styles.infoLabel}
            />
            <Text style={styles.notesLabel}>Notes</Text>
          </View>

          <Text style={styles.notesText}>
            {game.notes || "No additional notes provided."}
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.chatBtn}
          disabled={!game.chatEnabled}
        >
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
      paddingTop: 230
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
      gap:5
    },

    player: {
      alignItems: "center",

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
