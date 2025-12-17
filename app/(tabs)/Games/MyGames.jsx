import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useNavigation } from "@react-navigation/native";

const MyGames = ({ loggedUser, games = [] }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("current");

  const userId = loggedUser.id;

  // 1️⃣ filter only my games (hosted OR joined)
 const allGames = Object.values(games).flat();

const myGames = allGames.filter(
  g =>
    g.host?.id === userId ||
    g.players?.some(p => p.id === userId)
);


  // 2️⃣ split current / past
  const currentGames = myGames.filter(g => g.status === "active");
  const pastGames = myGames.filter(g => !g.status || g.status !== "active");

  const displayedGames =
    activeTab === "current" ? currentGames : pastGames;
  const TabButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabBtn, active && styles.activeTab]}
  >
    <Text
      style={[
        styles.tabText,
        active && styles.activeTabText,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      {/* TABS */}
      <View style={styles.tabs}>
        <TabButton
          label="Current"
          active={activeTab === "current"}
          onPress={() => setActiveTab("current")}
        />
        <TabButton
          label="Past"
          active={activeTab === "past"}
          onPress={() => setActiveTab("past")}
        />
      </View>

      {/* GAMES */}
      <ScrollView contentContainerStyle={styles.list}>
        {displayedGames.length === 0 && (
          <Text style={styles.emptyText}>
            No games here yet
          </Text>
        )}

        {displayedGames.map(game => {
          const isHost = game.host?.id === userId;
          const levels = Array.isArray(game.level)
          ? game.level
          : game.level
          ? [game.level]
          : [];
          return (
            <TouchableOpacity
              key={game.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("GameDetails", {
                  game,
                })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{game.title}</Text>

                {isHost && (
                  <View style={styles.hostBadge}>
                    <Text style={styles.hostText}>HOST</Text>
                  </View>
                )}
              </View>

              <Text style={styles.sub}>
                {game.date} · {game.time}
              </Text>

              <Text style={styles.sub}>
                {game.sport} · {levels.join(", ")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    tabs: {
      flexDirection: "row",
      padding: 12,
    },

    tabBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: "#eee",
      marginHorizontal: 4,
      alignItems: "center",
    },

    activeTab: {
      backgroundColor: "#2e89ff",
    },

    tabText: {
      fontWeight: "600",
      color: "#555",
    },

    activeTabText: {
      color: "#fff",
    },

    list: {
      padding: 16,
    },

    card: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },

    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      fontSize: 16,
      fontWeight: "700",
    },

    sub: {
      marginTop: 6,
      color: "#666",
    },

    hostBadge: {
      backgroundColor: "#f5b942",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },

    hostText: {
      fontSize: 10,
      fontWeight: "700",
    },

    emptyText: {
      textAlign: "center",
      marginTop: 40,
      color: "#777",
    },
  });


export default MyGames;
