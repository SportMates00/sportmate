import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";

const GameDetails = ({ loggedUser }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { game } = route.params;
  const userId = loggedUser?.id;
  const [gameState, setGameState] = useState(game);

  const isHost = gameState.host.id === userId;
  const isPlayer = gameState.players.some(p => p.id === userId);
  const hasRequested = gameState.pendingRequests?.some(p => p.id === userId);

  const canChat = isHost || isPlayer;

  const isFull = gameState.players.length >= gameState.maxPlayers;
  const canJoin =
    !isHost &&
    !isPlayer &&
    !hasRequested &&
    (!gameState.verifiedOnly || loggedUser?.verified) &&
    !isFull;

    const InfoRow = ({ icon, label, value, clickable }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="#666" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          clickable && { color: "#2e89ff" },
        ]}
      >
        {value}
      </Text>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <ImageBackground
        source={gameState.backgroundImage}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Only 18 hours left</Text>
          </View>

          <Text style={styles.title}>{gameState.title}</Text>
          <Text style={styles.subTitle}>
            {gameState.date} · {gameState.time}
          </Text>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* PLAYERS */}
        <Text style={styles.sectionTitle}>Players</Text>
        <View style={styles.playersRow}>
        {gameState.players.map(player => (
        <View key={player.id} style={styles.playerItem}>

            {/* Avatar wrapper */}
            <View style={{ position: "relative" }}>
            <Image source={player.profilePhoto} style={styles.avatar} />

            {/* VERIFIED BADGE (only for host) */}
            {player.id === gameState.host.id && gameState.host.verified && (
                <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={10} color="#fff" />
                </View>
            )}
            </View>

            <Text style={styles.playerName}>{player.name}</Text>
        </View>
        ))}


        {Array.from({
            length: gameState.maxPlayers - gameState.players.length,
        }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptySlot}>
            <Ionicons name="add" size={22} color="#bbb" />
            </View>
        ))}
        </View>
        {isHost && gameState.pendingRequests?.length > 0 && (
        <View style={styles.requestsBox}>
            <Text style={styles.sectionTitle}>Join requests</Text>

            {gameState.pendingRequests.map(request => (
            <View key={request.id} style={styles.requestRow}>
                <Text style={styles.requestName}>{request.name}</Text>

                <View style={{ flexDirection: "row" }}>
                {/* APPROVE */}
                <TouchableOpacity
                    style={styles.approveBtn}
                    onPress={() => {
                    // prevent overfilling
                    if (gameState.players.length >= gameState.maxPlayers) return;

                    setGameState(prev => ({
                        ...prev,
                        players: [
                        ...prev.players,
                        {
                            id: request.id,
                            name: request.name,
                            profilePhoto: request.profilePhoto || null,
                        },
                        ],
                        pendingRequests: prev.pendingRequests.filter(
                        p => p.id !== request.id
                        ),
                    }));
                    }}
                >
                    <Text style={styles.actionText}>Approve</Text>
                </TouchableOpacity>

                {/* REJECT */}
                <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => {
                    setGameState(prev => ({
                        ...prev,
                        pendingRequests: prev.pendingRequests.filter(
                        p => p.id !== request.id
                        ),
                    }));
                    }}
                >
                    <Text style={styles.actionText}>Reject</Text>
                </TouchableOpacity>
                </View>
            </View>
            ))}
        </View>
        )}



        {/* INFO BLOCKS */}
        <InfoRow icon="people" label="Game type" value={gameState.gameType} />
        <InfoRow icon="football" label="Sport" value={gameState.sport} />
        <InfoRow
          icon="stats-chart"
          label="Match level"
          value={gameState.level.join(", ")}
        />
        <InfoRow
          icon="location"
          label="Club"
          value={gameState.club}
          clickable
        />
        <InfoRow
          icon="calendar"
          label="Court"
          value={gameState.courtBooked ? "Booked" : "Not booked"}
        />
      </ScrollView>

      {/* BOTTOM ACTIONS */}
     <View style={styles.bottomBar}>

  {/* HOST VIEW */}
  {isHost && (
    <>
      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => navigation.navigate("EditGame", { gameState })}
      >
        <Text style={styles.chatText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.joinBtn, { backgroundColor: "#e74c3c" }]}
        onPress={() => {
          // later we’ll add confirmation modal
          console.log("Cancel game");
        }}
      >
        <Text style={styles.joinText}>Cancel game</Text>
      </TouchableOpacity>
    </>
  )}

  {/* NON-HOST VIEW */}
  {!isHost && (
    <>
      <TouchableOpacity
        disabled={!canChat}
        onPress={() => {
          if (!canChat) return;
          navigation.navigate("GameChat", { gameId: gameState.id });
        }}
        style={[
          styles.chatBtn,
          !canChat && styles.disabledBtn,
        ]}
      >
        <Text style={styles.chatText}>Chat</Text>
      </TouchableOpacity>

      {canJoin && (
        <TouchableOpacity
            style={styles.joinBtn}
            onPress={() => {
            setGameState(prev => ({
                ...prev,
                pendingRequests: [
                ...(prev.pendingRequests || []),
                {
                    id: userId,
                    name: loggedUser?.firstName,
                },
                ],
            }));
            }}
        >
            <Text style={styles.joinText}>Ask to join</Text>
        </TouchableOpacity>
        )}


      {hasRequested && (
  <TouchableOpacity
    style={[styles.joinBtn, styles.cancelBtn]}
    onPress={() => {
      setGameState(prev => ({
        ...prev,
        pendingRequests: prev.pendingRequests.filter(
          p => p.id !== userId
        ),
      }));
    }}
  >
    <Text style={styles.joinText}>Cancel request</Text>
  </TouchableOpacity>
)}

    </>
  )}

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
      height: 260,
      justifyContent: "space-between",
    },

    backBtn: {
      position: "absolute",
      top: 50,
      left: 16,
      zIndex: 10,
    },

    shareBtn: {
      position: "absolute",
      top: 50,
      right: 16,
      zIndex: 10,
    },

    headerContent: {
      padding: 16,
    },

    badge: {
      backgroundColor: "#f5b942",
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 10,
    },

    badgeText: {
      color: "#fff",
      fontWeight: "600",
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color: "#fff",
    },

    subTitle: {
      color: "#ddd",
      marginTop: 6,
    },

    content: {
      padding: 16,
      paddingBottom: 120,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
    },

    playersRow: {
      flexDirection: "row",
      marginBottom: 20,
    },

    playerItem: {
      marginRight: 16,
      alignItems: "center",
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginBottom: 6,
    },

    playerName: {
      fontSize: 12,
    },

    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 18,
    },

    infoLabel: {
      fontSize: 14,
      color: "#777",
    },

    infoValue: {
      fontSize: 16,
      fontWeight: "500",
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
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 14,
      borderRadius: 8,
      marginRight: 10,
      alignItems: "center",
    },

    joinBtn: {
      flex: 1,
      backgroundColor: "#2e89ff",
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

    disabledBtn: {
      opacity: 0.4,
    },
    emptySlot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    },
    verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#2e89ff",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    },
    cancelBtn: {
    backgroundColor: "#aaa",
    },
    requestsBox: {
    marginTop: 20,
    },

    requestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    },

    requestName: {
    fontSize: 15,
    fontWeight: "500",
    },

    approveBtn: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    },

    rejectBtn: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    },

    actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    },


  });


export default GameDetails;
