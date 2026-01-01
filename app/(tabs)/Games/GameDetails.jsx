import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import { selectCurrentUserId } from "@/src/store/selectors";
import GameDetailsButtons from "./GameDetailsButtons";

const GameDetails = ({navigation}) => {
  //
  const route = useRoute();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const {t, i18n} = useTranslation();
  const { gameId, tab } = route.params;

  const game = useSelector((state) =>
    state.gameEvents?.events?.find((g) => g.id === gameId)
  );
  const userId = useSelector(selectCurrentUserId)
  const isHost = game?.host?.id === userId;
  const isPlayer = !!game?.players?.some(p => p.id === userId);
  const canChat = isHost || isPlayer;
  console.log(isPlayer, userId);
  
  // Fallbacks (prevents crash if game missing)
  if (!game) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{t("GameNotFound")}</Text>
      </View>
    );
  }
// Always safe month key
const date = new Date(game.date);
const monthKey = date.toLocaleString('en-US', { month: 'short' });
const formattedDate = `${t(monthKey)} ${date.getDate()}, ${date.getFullYear()}`;
console.log('gamedetails', tab);

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
              {t('GameHost')}: {game.host?.name}
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
        <View style={styles.infoRow}>
          <Ionicons
            name="people-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={[styles.infoText, {paddingRight:20}]}>
            <Text style={[styles.infoLabel, {paddingBottom:10}]}>{t("GameDetailsPlayers")}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}  style={[styles.infoValue, {marginBottom:-20,}]}>
              <View style={styles.playersRow}>
                {game.players.map(player => {
                  const hasPhoto = !!player?.profilePhoto;
                  const initial = player?.name?.trim()?.charAt(0)?.toUpperCase() || '';

                  return (
                    <TouchableOpacity key={player.id} style={{alignItems:'center'}} 
                      >
                      
                        <TouchableOpacity 
                        style={hasPhoto ? styles.playerImage : styles.emptyPlayerImage}
                        onPress={() => navigation.navigate('Profile',{playerId: player.id})}>
                          { 
                            hasPhoto ? <Image source={player.profilePhoto}/> 
                              : 
                            <Text>{initial}</Text>  
                          }
                        
                        </TouchableOpacity>
                   
                      
                      <Text style={{color:theme.colors.text, marginTop:5, marginRight:5}}>{player.name}</Text>
                    </TouchableOpacity>
                  );
                })}

                {/* empty slots */}
                {tab == 'public' || canChat && Array.from({
                  length: game.maxPlayers - game.players.length,
                }).map((_, i) => (
                  <TouchableOpacity
                    key={`empty-${i}`}
                    style={[styles.avatar, styles.emptyAvatar]}
                  >
                    <Text style={{color:theme.colors.text, fontSize:20}}>+</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        {/* SPORT */}
        <View style={styles.infoRow}>
          <Ionicons
            name="football-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t("GameDetailsSport")}</Text>
            <Text style={styles.infoValue}>{t(game.sportName)}</Text>
          </View>
        </View>

        {/* LEVEL */}
        <View style={styles.infoRow}>
          <Ionicons
            name="stats-chart-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t("GameDetailsLevel")}</Text>
            <Text style={styles.infoValue}>
              {Array.isArray(game.level)
                ? game.level.map(l => t(l)).join(', ')
                : t(game.level)
              }
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t("GameDetailsLocation")}</Text>
            <Text style={styles.infoValue}>
              {t(game?.venue?.stadiumName) || "—"}
            </Text>
            <Text style={styles.infoSubValue}>
              {t(game?.venue?.city)}, {t('Armenia')}
            </Text>
          </View>
        </View>

        {/* ELIGIBILITY */}
        <View style={styles.infoRow}>
          <Ionicons
            name="people-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t("GameDetailsEligibility")}</Text>
            <Text style={styles.infoValue}>
              {game.verifiedOnly ? t("GameDetailsVerifiedOnly") : t("GameDetailsOpenEveryone")}
            </Text>
          </View>
        </View>

        {/* COURT BOOKED */}
        <View style={styles.infoRow}>
          <FontAwesome5
            name="calendar-check"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>
              {game.courtBooked ? t("GameDetailsCourtBooked") : t("GameDetailsCourtNotBooked")}
            </Text>
          </View>
        </View>

        {/* DATE & TIME */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={26}
            style={{color:theme.colors.text}}
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t('GameDetailsDate')}</Text>
            <Text style={styles.infoValue}>
              {formattedDate} · {formattedTime}
            </Text>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.infoRow}>
            <Ionicons
              name="document-text-outline"
              size={26}
              style={{color:theme.colors.text}}
            />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>{t("GameDetailsNotes")}</Text>
            <Text style={styles.infoValue}>
              {game.notes || t('GameDetailsNoNotes')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}

      <GameDetailsButtons game={game} loggedUser={userId} tab={tab}/>
    
    </View>
  );
};



const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
            paddingTop: 240
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
      fontSize: 18,
      fontWeight: "800",
      fontFamily: theme.fonts.family,
    },
    subTitle: {
      color: theme.colors.buttonText,
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
      justifyContent:'center',
      alignItems:'center'
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
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "500"
    },

    infoValue: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "100",
      marginTop:5
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
    playerImage: {
      width: 48,
      height: 48,
      borderRadius: 220,
      marginRight: 6,
      borderWidth: 1,
      borderColor: 'white',
    },
    emptyPlayerImage: {
      width: 48,
      height: 48,
      borderRadius: 220,
      marginRight: 6,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },
  });

export default GameDetails;
