import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AddSport from './AddSport';
import EditSports from './EditSports';
import { useTheme } from '@/src/theme/themeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const SportsTab = ({ loggedUser }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const [selectedSport, setSelectedSport] = useState(null);
  const [openEditSport, setOpenEditSport] = useState(false);
  const [userInfo, setUserInfo] = useState(loggedUser);

  const { sportsList, mainSport } = userInfo.profileInfo;

  return (
    <View style={styles.container}>
      {sportsList.map((item, index) => {
        const isMain = item.sportName === mainSport;

        return (
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
              source={item.sportIcon}
              style={styles.image}
              imageStyle={styles.imageRadius}
            >
              <View style={styles.overlay} />

              {/* Top Row */}
              <View style={styles.topRow}>
                <Text style={styles.sportName}>
                  {t(item.sportName)}
                </Text>

                {isMain && (
                  <View style={styles.mainBadge}>
                    <Text style={styles.mainText}>
                      {t('mainSport')}
                    </Text>
                  </View>
                )}
              </View>

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                <Text style={styles.level}>
                  {t(item.sportLevel)}
                </Text>
                <Ionicons name="chevron-forward" size={22} color="#fff" />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}

      {/* Add Sport */}
      <AddSport
        loggedUser={loggedUser}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />

      {/* Edit Sport */}
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

/* ================= STYLES (UNCHANGED) ================= */

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 16,
      width: '100%',
      alignItems: 'center',
    },

    card: {
      height: 160,
      borderRadius: 18,
      overflow: 'hidden',
      width: '100%',
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
  });
