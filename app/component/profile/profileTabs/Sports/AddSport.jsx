import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import AddSportModal from './AddSportModal';

const AddSport = ({ userInfo, setUserInfo }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const [showAddSport, setShowAddSport] = useState(false);

  return (
    <View style={styles.container}>
      {/* ADD SPORT BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddSport(true)}
      >
        <Text style={styles.addButtonText}>{t('AddSport')}</Text>
      </TouchableOpacity>

      {/* ADD SPORT MODAL */}
      <AddSportModal
        visible={showAddSport}
        onClose={() => setShowAddSport(false)}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </View>
  );
};

export default AddSport;

/* ---------------- STYLES ---------------- */

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 10,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      height: 40,
      width: 200,
      borderRadius: theme.radius.semiCircle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      color: theme.colors.buttonText,
      fontSize: theme.fonts.size.medium,
      fontWeight: '600',
    },
  });
