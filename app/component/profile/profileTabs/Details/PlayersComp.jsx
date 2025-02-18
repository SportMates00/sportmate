import { View,Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import players from '../../../../../assets/images/favicon.png'

const PlayersComp = ({event}) => {
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

const styles = StyleSheet.create({
  playersSection: {
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    borderRadius: 25,
  },
  playerName: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default PlayersComp;