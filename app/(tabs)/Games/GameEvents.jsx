// Events.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
const GameEvents = ({ gameEvents }) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
        <ScrollView>
      {gameEvents.length === 0 ? (
        <Text style={styles.noEventsText}>There are currently no events</Text>
      ) : (
        gameEvents.map((game) => {
          if (!game) return null;

          return (
            <View key={game.id} style={styles.card}>
              {/* Background Image */}
              <Image source={game.backgroundImage} style={styles.backgroundImage} />
              <View style={styles.overlay} />

              {/* Content */}
              <View style={styles.content}>
                <Text style={styles.sport}>{game.sport}</Text>
                <Text style={styles.date}>{game.date}</Text>

                {/* Players */}
                <View style={styles.playersRow}>
                  {game.players?.map((p) => (
                    <Image
                      key={p}
                      source={p.profilePhoto}
                      style={styles.playerPic}
                    />
                  ))}
                </View>

                <Text style={styles.level}>{game.level}</Text>
                <Text style={styles.location}>{game.location}</Text>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.detailsButton}>
                     <Text style={styles.detailsText}>View Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinText}>Ask to Join</Text>
                    </TouchableOpacity>
                </View>

              </View>
            </View>
          );
        })
      )}
      </ScrollView>
    </View>

    
    
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 60,
  },

  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },

  card: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
    position: 'relative',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000055',
  },

  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  sport: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },

  date: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 4,
  },

  playersRow: {
    flexDirection: 'row',
  },

  playerPic: {
    width: 26,
    height: 26,
    borderRadius: 999,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },

  level: {
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 12,
  },

  location: {
    color: '#fff',
    fontSize: 12,
  },

  joinButton: {
    backgroundColor: '#24a34c',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },

  joinText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  buttonsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 6,
},

detailsButton: {
  flex: 1,
  backgroundColor: '#ffffffaa', // semi-transparent white
  paddingVertical: 6,
  borderRadius: 6,
  alignItems: 'center',
  marginRight: 6,
},

detailsText: {
  color: '#000',
  fontWeight: '600',
  fontSize: 13,
},

joinButton: {
  flex: 1,
  backgroundColor: '#24a34c',
  paddingVertical: 6,
  borderRadius: 6,
  alignItems: 'center',
  marginLeft: 6,
},

joinText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 13,
},


});

export default GameEvents;
