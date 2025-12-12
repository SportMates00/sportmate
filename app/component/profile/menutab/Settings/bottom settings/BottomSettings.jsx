import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

function BottomSettings() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsConditions = () => {
    navigation.navigate('TermsConditions');
  };

  const handleFindFriends = () => {
    navigation.navigate('Players');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.optionRow}>
          <MaterialIcons
            name="star"
            size={theme.fonts.size.xLarge}
            color="orange"
          />
          <Text style={styles.optionText}>
            {t('RateUs')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFindFriends}>
        <View style={styles.optionRow}>
          <MaterialIcons
            name="people"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('FindFriends')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePrivacyPolicy}>
        <View style={styles.optionRow}>
          <MaterialIcons
            name="privacy-tip"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('PrivacyPolicy')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleTermsConditions}>
        <View style={styles.optionRow}>
          <MaterialIcons
            name="rule"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('TermsConditions')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      gap: 30,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.text,
      paddingVertical: theme.spacing.large,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    optionText: {
      fontSize: theme.fonts.size.medium,
      color: theme.colors.text,
    },
  });

export default BottomSettings;
