import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { selectCurrentUser } from "@/src/store/selectors";


const GameEvents = ({gameEvents}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  // ⛳️ Your slice returns { events:[...] }
  //const gameEvents = useSelector((state) => state.gameEvents?.events || []);
  const loggedUser = useSelector(selectCurrentUser)

  // format date like "Jun 30, 2025"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthKey = date.toLocaleString('en-US', { month: 'short' });  
    return `${t(monthKey)} ${date.getDate()}, ${date.getFullYear()}`
  };


  // convert "09:00" → "9:00 AM"
  const formatTime = (timeStr) => {
    try {
      const [h, m] = timeStr.split(":");
      return new Date(0, 0, 0, h, m).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return timeStr;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gameEvents.map((game) => {
         return (
        <View style={styles.card} key={game.id}>
          <Image
            source={require("../../../assets/images/football-field.webp")}
            style={styles.image}
          />

          <View style={styles.overlay} />

          {/* Top-right status */}
          <View style={styles.topRightStatus}>
            <View style={[styles.badge]}>
             { game.courtBooked && <FontAwesome5 name="calendar-check" size={20} color="#fff" /> }
              { game.verifiedOnly && <Ionicons name="checkmark-circle" size={22} color="#fff" /> }
            </View>
          </View>

          <View style={styles.inner}>
            {/* Header */}
            <View>
              <Text style={styles.sport}>
                {t(game.sportName || game.sport)}
              </Text>

              <View style={styles.dateRow}>
                <Text style={styles.date}>{formatDate(game.date)}</Text>
                <Text style={styles.time}>• {formatTime(game.time)}</Text>
              </View>
            </View>

            {/* Players */}
            <View style={styles.playersRow}>
              {/* keeping design — default icon */}
              {game.players.map(player => {
                const hasPhoto = !!player?.profilePhoto;
                const initial = player?.name?.trim()?.charAt(0)?.toUpperCase() || '';

                return (
                  <View key={player.id}>
                    {hasPhoto ? (
                      <TouchableOpacity onPress={() => navigation.navigate('Profile',{playerId: player.id})}>
                        <Image
                        source={player.profilePhoto}
                        style={styles.player}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.emptyPlayer}
                        onPress={() => navigation.navigate('Profile',{playerId: player.id})}
                      >
                        <Text>{initial}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}

            </View>

            {/* Meta */}
            <View style={styles.infoRow}>
              <Ionicons name="stats-chart-outline" size={14} color="#fff" />
              <Text style={styles.infoText}>
                {game.level.length > 1 ? `${t(game.level[0]) + ',' + t(game.level[1])}...` : t(game.level[0])}
           
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.infoText}>
                {game?.venue?.stadiumName || "—"}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate('GameDetails',{gameId: game.id})}
              >
                <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
              </TouchableOpacity>

             {loggedUser?.id !== game.host.id && (
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    game.verifiedOnly && !loggedUser?.userVerification && styles.disabledJoinBtn
                  ]}
                  onPress={() => {
                    if (game.verifiedOnly && !loggedUser?.userVerification) {
                      Alert.alert(
                        "Verification required",
                        "This event is only available to verified users."
                      );
                      return;
                    }
                  }}
                >
                  <Text style={styles.primaryText}>{t("AskToJoin")}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
          )})
        }
      
    </ScrollView>
  );
};




const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 80,
    },
    card: {
      height: 200,
      borderRadius: 14,
      marginBottom: 16,
      overflow: 'hidden',
      backgroundColor: '#000',
    },
    disabledJoinBtn: {
  backgroundColor: "rgba(255,255,255,0.3)", // slightly lighter
},
    image: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    inner: {
      flex: 1,
      padding: 14,
      justifyContent: 'space-between',
    },
    sport: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },

    date: {
      fontSize: 12,
      color: '#fff',
      fontFamily: theme.fonts.family,
    },

    time: {
      fontSize: 12,
      color: '#fff',
      opacity: 0.9,
      fontFamily: theme.fonts.family,
    },
    playersRow: {
      flexDirection: 'row',
      marginVertical: 6,
    },
    player: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginRight: 6,
      borderWidth: 1,
      borderColor: '#fff',
    },
    emptyPlayer: {
      width: 30,
      height: 30,
      borderRadius: 220,
      marginRight: 6,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },

    infoText: {
      fontSize: 12,
      color: '#fff',
      fontFamily: theme.fonts.family,
    },

    actions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    secondaryBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    secondaryText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },
    primaryBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      fontFamily: theme.fonts.family,
    },
    primaryText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
    },
   topRightStatus: {
      position: 'absolute',
      top: 10,
      right: 10,
      alignItems: 'flex-end',
      gap: 6,
      zIndex: 10,
    },
    courtBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    courtBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.buttonText,
    },
    verifiedBadge: {
      backgroundColor: 'rgba(255,255,255,0.85)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    verifiedBadgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: '#000',
    },

    badge: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

  });

export default GameEvents;
