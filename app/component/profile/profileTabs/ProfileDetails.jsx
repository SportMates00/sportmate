import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import About from './About';
import Sports from './Sports/Sports';
import Activity from './Details/Activity';
import Reviews from './Reviews';
import { useTheme } from '@/app/theme/themeContext';

export default function ProfileDetails({loggedUser}) {
  const [activeTab, setActiveTab] = useState('About'); // Default to "About"
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const tabs = ["About", "Sports", "Reviews", "Activity"];

  return (
    <View style={styles.container}>
      {/* Row of Buttons */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Indicator Line */}
      <View style={styles.indicatorRow}>
        {tabs.map((tab) => (
          <View
            key={tab}
            style={[
              styles.indicator,
              activeTab === tab && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Content Area Placeholder */}
      <View style={styles.contentArea}>
        {activeTab === 'About' ? <About loggedUser={loggedUser}/> 
        : activeTab === 'Sports' ? <Sports loggedUser={loggedUser} /> 
        : activeTab === 'Reviews' ? <Reviews loggedUser={loggedUser}/> : <Activity loggedUser={loggedUser}/> }
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    height:'100%'
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
    color: theme.colors.primary, // Highlighted text color
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 2,
    backgroundColor: '#D3D3D3', // Gray background
  },
  indicator: {
    flex: 1,
    backgroundColor: '#D3D3D3', // Gray for inactive
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary, // Light blue for active
  },
  contentArea: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
