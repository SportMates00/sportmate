import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import AvailabilityTable from '../AvailibilityTable';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const About = ({ loggedUser }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const [rating, setRating] = useState('');

  /* ================= MAIN SPORT DERIVATION ================= */
  const mainSportObject = useMemo(() => {
    return loggedUser.profileInfo.sportsList.find(
      item => item.sportName === loggedUser.profileInfo.mainSport
    );
  }, [loggedUser]);

  /* ================= LEVEL → RATING ================= */
  useEffect(() => {
    if (!mainSportObject) {
      setRating('-');
      return;
    }

    switch (mainSportObject.sportLevel) {
      case 'Beginner':
        setRating('⭐');
        break;
      case 'Intermediate':
        setRating('⭐ ⭐ ⭐');
        break;
      case 'Professional':
        setRating('⭐ ⭐ ⭐ ⭐ ⭐');
        break;
      default:
        setRating('-');
    }
  }, [mainSportObject]);

  return (
    <View style={{ backgroundColor: theme.colors.background, width: '100%' }}>
      {/* ================= TOP INFO ROW ================= */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.title}>{t('ageProfile')}</Text>
          <Text style={styles.value}>
            {loggedUser.profileInfo.age !== ''
              ? loggedUser.profileInfo.age
              : '-'}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.title}>{t('locationProfile')}</Text>
          <Text style={styles.value}>
            {loggedUser.profileInfo.location !== ''
              ? loggedUser.profileInfo.location
              : '-'}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.title}>{t('genderProfile')}</Text>
          <Text style={styles.value}>
            {loggedUser.profileInfo.gender !== ''
              ? loggedUser.profileInfo.gender
              : '-'}
          </Text>
        </View>
      </View>

      {/* ================= SPORT SECTION ================= */}
      <View style={styles.sport}>
        <Text style={styles.sportText}>{t('sportProfile')}</Text>
        <View style={styles.sportInfo}>
          <Text style={styles.sportInfoText}>
            {t(loggedUser.profileInfo.mainSport)} :
          </Text>
          <Text style={{ marginLeft: 6 }}>{rating}</Text>
        </View>
      </View>
      <AvailabilityTable loggedUser={loggedUser} />
    </View>
  );
};

export default About;

/* ================= STYLES ================= */

const getStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomWidth: 1,
      borderBottomColor: 'silver',
      paddingTop: theme.spacing.medium,
      paddingBottom: theme.spacing.medium,
    },
    column: {
      alignItems: 'center',
      gap: 5,
    },
    title: {
      fontWeight: 'bold',
      fontSize: theme.fonts.size.medium,
      color: theme.colors.text,
    },
    value: {
      color: theme.colors.text,
      fontSize: theme.fonts.size.medium,
    },
    sport: {
      paddingTop: theme.spacing.medium,
      paddingBottom: theme.spacing.medium,
    },
    sportText: {
      fontWeight: 'bold',
      fontSize: theme.fonts.size.large,
      color: theme.colors.text,
    },
    sportInfo: {
      paddingTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sportInfoText: {
      color: theme.colors.text,
    },
  });
