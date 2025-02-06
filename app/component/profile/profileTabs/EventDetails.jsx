import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventDetails = ({ event, onBack }) => {
  // If event data isn't available, display an error message.
  if (!event) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>No event details available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Event Details</Text>

      <View style={styles.detailRow}>
        <Ionicons name="football-outline" size={20} color="#00AEEF" />
        <Text style={styles.detailText}>{event.sport}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="barbell-outline" size={20} color="#00AEEF" />
        <Text style={styles.detailText}>Level: {event.level}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={20} color="#00AEEF" />
        <Text style={styles.detailText}>{event.dateTime}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={20} color="#00AEEF" />
        <Text style={styles.detailText}>
          {event.location.city}, {event.location.stadium}
        </Text>
      </View>

      <Text style={styles.participantsHeader}>Participants</Text>
      {event.participants && event.participants.length > 0 ? (
        event.participants.map((player, index) => (
          <Text key={index} style={styles.participant}>
            {player}
          </Text>
        ))
      ) : (
        <Text style={styles.noParticipants}>No participants available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  participantsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  participant: {
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    elevation: 2,
  },
  noParticipants: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
});

export default EventDetails;
