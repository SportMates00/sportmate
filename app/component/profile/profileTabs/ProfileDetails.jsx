import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import About from './About';
import Sports from './Sports/SportsTab';
import Activity from './Details/Activity';
import Reviews from './Reviews';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

export default function ProfileDetails({ loggedUser }) {
  const [activeTab, setActiveTab] = useState('profileAboutTab');
  const [tabLayouts, setTabLayouts] = useState({});
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const tabs = [
    { key: 'profileAboutTab', label: t('profileAboutTab') },
    { key: 'profileSports', label: t('profileSports') },
    { key: 'profileReviews', label: t('profileReviews') },
    { key: 'profileActivity', label: t('profileActivity') },
  ];

  const onTabLayout = (key, e) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts(prev => ({
      ...prev,
      [key]: { x, width },
    }));
  };

  const activeLayout = tabLayouts[activeTab];

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onLayout={(e) => onTabLayout(tab.key, e)}
            onPress={() => setActiveTab(tab.key)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Indicator */}
      <View style={styles.indicatorContainer}>
        {activeLayout && (
          <View
            style={[
              styles.activeIndicator,
              {
                width: activeLayout.width * 0.9,
                left: activeLayout.x + activeLayout.width * 0.05,
              },
            ]}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.contentArea}>
        {activeTab === 'profileAboutTab' ? (
          <About loggedUser={loggedUser} />
        ) : activeTab === 'profileSports' ? (
          <Sports loggedUser={loggedUser} />
        ) : activeTab === 'profileReviews' ? (
          <Reviews loggedUser={loggedUser} />
        ) : (
          <Activity loggedUser={loggedUser} />
        )}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.medium,
    },
    tabRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: theme.spacing.small,
    },
    tabButton: {
      paddingVertical: theme.spacing.small,
    },
    tabText: {
      fontSize: theme.fonts.size.medium,
      color: theme.colors.text,
    },
    activeTabText: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    indicatorContainer: {
      height: 2,
      backgroundColor: '#D3D3D3',
      position: 'relative',
    },
    activeIndicator: {
      position: 'absolute',
      height: 2,
      backgroundColor: theme.colors.primary,
    },
    contentArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
