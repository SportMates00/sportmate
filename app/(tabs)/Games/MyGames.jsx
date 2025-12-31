import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectMyCurrentGames, selectMyPastGames } from "@/src/store/gameEventsSelector";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import GameCardButtons from "./GameCardButtons";

const MyGames = ({ loggedUser }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [tab, setTab] = useState("current");

  const currentGames = useSelector(selectMyCurrentGames);
  const pastGames = useSelector(selectMyPastGames);

  const myGames = tab === "current" ? currentGames : pastGames;

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
      <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:30, marginTop:10}}>
        <TouchableOpacity style={[styles.currentButton,tab == 'current' && { borderBottomWidth:1,}]} onPress={() => setTab("current")}>
          <Text style={[{color:theme.colors.text}, tab == 'current' && {fontWeight:800}]}>{t('Current')}</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.currentButton,tab !== 'current' && { borderBottomWidth:1,}]} onPress={() => setTab("past")}>
          <Text style={[{color:theme.colors.text}, tab !== 'current' && {fontWeight:800}]}>{t('Past')}</Text>
        </TouchableOpacity>     
      </View>
      {myGames.map((game) => {
       
          return (
        <TouchableOpacity onPress={() => !game?.rejectedPlayers?.some((p) => p.id ===  loggedUser?.id) && navigation.navigate('GameDetails', {gameId: game.id, tab})} style={styles.card} key={game.id}>
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
              <View style={styles.dateRow}>
                <View>
                  <Text style={styles.sport}>
                    {t(game.sportName || game.sport)}
                  </Text>
                </View>

                { game?.host?.id === loggedUser?.id &&<View>
                  <FontAwesome5
                    name="crown"
                    size={12}
                    color={theme.colors.primary}
                    solid
                    style={{marginBottom:2}}
                  />
                </View>}
              </View>

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
                        style={[styles.player, {position:'relative'}]}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={[styles.emptyPlayer,{position:'relative'}]}
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
              <GameCardButtons game={game} loggedUser={loggedUser} tab={tab}/>
          </View>
        </TouchableOpacity>
          )
        }
      )}
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
},

currentButton: {
  height:28,
 
  borderColor:theme.colors.primary,
  width:120,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center'
}

  });

export default MyGames;
