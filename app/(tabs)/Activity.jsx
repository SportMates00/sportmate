import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/app/theme/themeContext';

const windowWidth = Dimensions.get('window').width;


const mockEvents = [
  {
    sport: 'Football',
    dateTime: 'Sat, April 20 • 17:30',
    backgroundImage: require('../../assets/images/mher.jpg'),
    players: [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      null,
      null,
    ],
    level: 'Intermediate',
    location: 'Yerevan, Armenia',
  },
  {
    sport: 'Tennis',
    dateTime: 'Sun, April 21 • 10:00',
    backgroundImage: require('../../assets//images/njteh.jpg'),
    players: [
      'https://randomuser.me/api/portraits/women/3.jpg',
      null,
    ],
    level: 'Beginner',
    location: 'Vanadzor, Armenia',
  },
];

const HomeScreen = ({ navigation }) => {
  const handleJoin = () => {
    alert('Join request sent!');
  };

  const handleCreateGame = () => {
    alert('Navigate to Create Game screen');
    // navigation.navigate('CreateGame');
  };

    const { theme } = useTheme(); // Get current theme and toggle (if needed)
    const styles = getStyles(theme); // Generate dynamic styles based on current theme

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mockEvents.map((event, index) => (
          <View key={index} style={styles.card}>
            <Image source={event.backgroundImage} style={styles.backgroundImage} />
            <View style={styles.overlay} />
            <View style={styles.cardContent}>
              <Text style={styles.sport}>{event.sport}</Text>
              <Text style={styles.date}>{event.dateTime}</Text>

              <View style={styles.playersRow}>
                {(event.players || []).map((player, i) => (
                  <Image
                    key={i}
                    source={player ? { uri: player } : require('../../assets//images/njteh.jpg')}
                    style={styles.playerPic}
                  />
                ))}
              </View>

              <Text style={styles.level}>{event.level}</Text>
              <Text style={styles.location}>{event.location}</Text>

              <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                <Text style={styles.joinText}>Ask to Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateGame}>
        <Text style={styles.createText}>Create a Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingBottom: 80,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    height: 240,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
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
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  sport: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 10,
  },
  playersRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  playerPic: {
    width: 35,
    height: 35,
    borderRadius: 999,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  level: {
    color: '#fff',
    fontStyle: 'italic',
  },
  location: {
    color: '#fff',
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 999,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
