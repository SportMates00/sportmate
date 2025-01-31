import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AddSport from './AddSport';

const sportImages = {
  Football: require('../../../../assets/images/football.png'),
  Basketball: require('../../../../assets/images/basketball.png'),
  Tennis: require('../../../../assets/images/tennis.png'),
  TableTennis: require('../../../../assets/images/tabletennis.png'),
  Bowling: require('../../../../assets/images/bowling.png'),
};

const Sports = ({ loggedUser }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={loggedUser.profileInfo.sportsList}
        keyExtractor={(item) => item.sport}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={sportImages[item.sport] || sportImages.Default}
              style={styles.cardImage}
            />
            <View style={styles.cardOverlay}>
              <Text style={styles.sportText}>{item.sport}</Text>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>
          </View>
        )}
      />
      <AddSport />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  sportText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  levelText: {
    fontSize: 14,
    color: 'white',
  },
});

export default Sports;
