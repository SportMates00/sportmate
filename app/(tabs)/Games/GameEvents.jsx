// GameEvents.jsx
import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const GameEvents = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* CARD 1 */}
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/football-field.webp")}
          style={styles.image}
        />
        <View style={styles.overlay} />

                {/* Top-right status */}
        
        <View style={styles.topRightStatus}>
          <View style={[styles.badge]}>
<Ionicons name="calendar-outline"  color="#fff"/>
            <Text style={[styles.courtBadgeText, styles.courtBadge]}>{t('CourtBooked')}</Text>
             <Ionicons name="checkmark-circle" size={14} color="#fff" />
          </View>
        </View>

        {/* <View style={styles.topRightStatus}>
          <View style={styles.courtBadge}>
            <Text style={styles.courtBadgeText}>
              {t('CourtBooked')}
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedBadgeText}>
              {t('VerifiedUsersOnly')}
            </Text>
          </View>
        </View> */}

        <View style={styles.inner}>
          {/* Header */}
          <View>
            <Text style={styles.sport}>{t('Football')}</Text>
            <View style={styles.dateRow}>
              <Text style={styles.date}>Jun 30, 2025</Text>
              <Text style={styles.time}>• 8:00 PM</Text>
            </View>
          </View>

          {/* Players */}
          <View style={styles.playersRow}>
            <Image
              source={require("../../../assets/images/favicon.png")}
              style={styles.player}
            />
            <Image
              source={require("../../../assets/images/favicon.png")}
              style={styles.player}
            />
            <Image
              source={require("../../../assets/images/favicon.png")}
              style={styles.player}
            />
          </View>

          {/* Meta */}
          <View style={styles.infoRow}>
            <Ionicons name="stats-chart-outline" size={14} color="#fff" />
            <Text style={styles.infoText}>{t('Intermediate')}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#fff" />
            <Text style={styles.infoText}>Hrazdan Stadium</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('GameDetails')}
            >
              <Text style={styles.secondaryText}>
                {t('ViewDetails')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryText}>
                {t('AskToJoin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
      width: 28,
      height: 28,
      borderRadius: 20,
      marginRight: 6,
      borderWidth: 2,
      borderColor: '#fff',
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

    actions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    secondaryBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    secondaryText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },
    primaryBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      fontFamily: theme.fonts.family,
    },
    primaryText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.buttonText,
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
}

  });

export default GameEvents;
