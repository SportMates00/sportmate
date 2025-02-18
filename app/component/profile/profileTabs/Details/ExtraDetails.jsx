import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ExtraDetails = ({event}) => {
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

const styles = StyleSheet.create({
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
      },
      sectionValue: {
        fontSize: 16,
        color: "#555",
      },
});

export default ExtraDetails