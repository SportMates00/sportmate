import { View,Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import players from '../../../../../assets/images/favicon.png'
import { useTheme } from '@/app/theme/themeContext';

const PlayersComp = ({event}) => {
    const { theme } = useTheme(); // Get current theme and toggle (if needed)
    const styles = getStyles(theme); // Generate dynamic styles based on current theme
  return (
    <View style={styles.playersSection}>
      {(event.teamA?.length && event.teamB.length) === 1 ? (
              <>
                <Text style={styles.sectionTitle}><Image source={players}/>  Players</Text>
                <View style={styles.playersRow}>
                
                    <View  style={styles.playerContainer}>
                      <View >
                        <Image source={event.teamA[0].profilePhoto} style={styles.playerImage} />
                        <Text style={styles.playerName}>{event.teamA[0].name}</Text>
                      </View>
                      <View>
                        <Image source={event.teamB[0].profilePhoto} style={styles.playerImage} />
                        <Text style={styles.playerName}>{event.teamB[0].name}</Text>
                      </View>
                      
                    </View>
                  
                </View>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}><Image source={players}/>  Team A</Text>
                <View style={styles.playersRow}>
                  {event.teamA.map((player, index) => (
                    <View key={index} style={styles.teamsContainer}>
                      <Image source={ player.profilePhoto } style={styles.playerImage} />
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                  ))}
                </View>
    
                <Text style={styles.sectionTitle}><Image source={players}/>  Team B</Text>
                <View style={styles.playersRow}>
                  {event.teamB.map((player, index) => (
                    <View key={index} style={styles.teamsContainer}>
                      <Image source={ player.profilePhoto } style={styles.playerImage} />
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                  ))}
                </View>
                
              </>
              )}
    </View>
  )
  };

const getStyles = (theme) => StyleSheet.create({
  playersSection: {
    padding: theme.spacing.large,
    gap: 10,
  },
  sectionTitle: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    marginBottom: theme.spacing.small,
    color:theme.colors.text
  },
  playersRow: {
    flexDirection: "row",
    gap: 15,
    flexWrap: 'wrap',
  },
  playerContainer: {
    alignItems: "center",
    flexDirection: 'row',
    gap: 20,
  },
  teamsContainer: {
    alignItems: "center",
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.circle,
  },
  playerName: {
    marginTop: theme.spacing.small,
    fontSize: theme.fonts.size.medium,
    color:theme.colors.text
  },
});

export default PlayersComp;