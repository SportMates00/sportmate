import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/app/theme/themeContext';

const ExtraDetails = ({event}) => {
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Type</Text>
        <Text style={styles.sectionValue}>{event.gameType}</Text>
      </View>

      {/* Sport */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sport</Text>
        <Text style={styles.sectionValue}>{event.sport}</Text>
      </View>
      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.sectionValue}>{event.location}{event.city}</Text>
      </View>
      {/* Date */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date</Text>
        <Text style={styles.sectionValue}>{event.date}{event.time}</Text>
      </View>
    </View>
  )
}

const getStyles = (theme) => StyleSheet.create({
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "red",
      },
      sectionTitle: {
        fontSize: theme.fonts.size.large,
        fontWeight: "bold",
        marginBottom: 5,
        color: theme.colors.text,
      },
      sectionValue: {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.text,
      },
});

export default ExtraDetails