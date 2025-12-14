// GameEvents.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const GameEvents = ({ gameEvents }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView>
        {gameEvents.length === 0 ? (
          <Text style={styles.noEventsText}>
            {t('NoGameEvents')}
          </Text>
        ) : (
          gameEvents.map((game) => {
            if (!game) return null;

            return (
              <View key={game.id} style={styles.card}>
                <Image
                  source={game.backgroundImage}
                  style={styles.backgroundImage}
                />
                <View style={styles.overlay} />

                <View style={styles.content}>
                  <Text style={styles.sport}>{game.sport}</Text>
                  <Text style={styles.date}>{game.date}</Text>

                  <View style={styles.playersRow}>
                    {game.players?.map((p) => (
                      <Image
                        key={p.name}
                        source={p.profilePhoto}
                        style={styles.playerPic}
                      />
                    ))}
                  </View>

                  <Text style={styles.level}>{game.level}</Text>
                  <Text style={styles.location}>{game.location}</Text>

                  <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsText}>
                        {t('ViewDetails')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinText}>
                        {t('AskToJoin')}
                      </Text>
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

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 15,
      paddingBottom: 60,
    },

    noEventsText: {
      textAlign: 'center',
      marginTop: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
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
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    content: {
      flex: 1,
      padding: 10,
      justifyContent: 'space-between',
    },

    sport: {
      fontSize: 17,
      fontWeight: 'bold',
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
    },

    date: {
      fontSize: 12,
      color: theme.colors.buttonText,
      marginBottom: 4,
      fontFamily: theme.fonts.family,
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
      borderColor: theme.colors.buttonText,
    },

    level: {
      color: theme.colors.buttonText,
      fontStyle: 'italic',
      fontSize: 12,
      fontFamily: theme.fonts.family,
    },

    location: {
      color: theme.colors.buttonText,
      fontSize: 12,
      fontFamily: theme.fonts.family,
    },

    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
    },

    detailsButton: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingVertical: 6,
      borderRadius: 6,
      alignItems: 'center',
      marginRight: 6,
    },

    detailsText: {
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: 13,
      fontFamily: theme.fonts.family,
    },

    joinButton: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 6,
      borderRadius: 6,
      alignItems: 'center',
      marginLeft: 6,
    },

    joinText: {
      color: theme.colors.buttonText,
      fontWeight: '600',
      fontSize: 13,
      fontFamily: theme.fonts.family,
    },
  });

export default GameEvents;
