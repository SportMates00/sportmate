import { useTheme } from '@/src/theme/themeContext';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Switch, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import LangChanger from '@/app/component/LangChanger';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function TopSettings() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const { theme, mode, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  const handleVerification = () => {
    navigation.navigate('VerifyAccount');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const iconContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap:5
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleVerification}>
        <View style={styles.optionRow}>
          <MaterialIcons
            name="verified-user"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('VerifyAccount')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChangePassword}>
        <View style={styles.optionRow}>
          <Feather
            name="lock"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('ChangePassword')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openModal}>
        <View style={styles.optionRow}>
          <LangChanger
            iconContainer={iconContainer}
            text={t('ChangeLanguage')}
            isModalVisible={isModalVisible}
            closeModal={closeModal}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionRow}>
        <Ionicons
          name="notifications"
          size={theme.fonts.size.xLarge}
          color={theme.colors.text}
        />
        <Text style={styles.optionText}>
          {t('Notifications')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: -10,
        }}
      >
        <TouchableOpacity style={styles.optionRow}>
          <MaterialIcons
            name="dark-mode"
            size={theme.fonts.size.xLarge}
            color={theme.colors.text}
          />
          <Text style={styles.optionText}>
            {t('DarkMode')}
          </Text>
        </TouchableOpacity>

        <Switch
          style={{ margin: 0, padding: 0 }}
          value={mode === 'dark'}
          onValueChange={toggleTheme}
        />
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
      paddingBottom: theme.spacing.medium,
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

export default TopSettings;
