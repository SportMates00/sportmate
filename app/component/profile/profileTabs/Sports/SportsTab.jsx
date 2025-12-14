import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AddSport from './AddSport';
import EditSports from './EditSports';
import { useTheme } from '@/src/theme/themeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const sportImages = {
  Squash: require('../../../../../assets/images/football-field.webp'),
  Badminton: require('../../../../../assets/images/football-field.webp'),
  TableTennis: require('../../../../../assets/images/football-field.webp'),
};

const SportsTab = ({ loggedUser }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedSport, setSelectedSport] = useState(null);
  const [openEditSport, setOpenEditSport] = useState(false);
  const [userInfo, setUserInfo] = useState(loggedUser);

  const allSports = [
    {
      sport: loggedUser.profileInfo.sport.sport,
      level: loggedUser.profileInfo.level,
      points: loggedUser.profileInfo.points || 1300,
      main: true,
    },
    ...userInfo.profileInfo.sportsList,
  ];

  return (
    <View style={styles.container}>
      {allSports.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.85}
          style={styles.card}
          onPress={() => {
            setSelectedSport(item);
            setOpenEditSport(true);
          }}
        >
          <ImageBackground
            source={sportImages[item.sport]}
            style={styles.image}
            imageStyle={styles.imageRadius}
          >
            <View style={styles.overlay} />

            {/* Top Row */}
            <View style={styles.topRow}>
              <Text style={styles.sportName}>{item.sport}</Text>
              {item.main && (
                <View style={styles.mainBadge}>
                  <Text style={styles.mainText}>Main</Text>
                </View>
              )}
            </View>

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.level}>{item.level}</Text>
                <Text style={styles.points}>{item.points} Pts.</Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}

      {/* Add Sport */}
      <AddSport loggedUser={loggedUser} setUserInfo={setUserInfo} userInfo={userInfo} />

      <EditSports
        sport={selectedSport}
        openEditSport={openEditSport}
        setOpenEditSport={setOpenEditSport}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
    </View>
  );
};

export default SportsTab;

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 16,
    },

    card: {
      height: 160,
      borderRadius: 18,
      overflow: 'hidden',
    },

    image: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 16,
    },

    imageRadius: {
      borderRadius: 18,
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.35)',
    },

    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    sportName: {
      color: '#fff',
      fontSize: 14,
      opacity: 0.9,
    },

    mainBadge: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },

    mainText: {
      fontSize: 12,
      fontWeight: '600',
    },

    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    level: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '700',
    },

    points: {
      color: '#fff',
      fontSize: 14,
      marginTop: 4,
      opacity: 0.9,
    },
  });
