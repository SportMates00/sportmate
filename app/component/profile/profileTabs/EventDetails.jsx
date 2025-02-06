import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventDetails = ({ event }) => {
    const [modalVisible, setModalVisible] = useState(false);
  // If event data isn't available, display an error message.
  return (

    <View>

    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
    <Modal
    visible={modalVisible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => setModalVisible(false)}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.header}>Event Details</Text>

        <View style={styles.detailRow}>
          <Ionicons name="football-outline" size={20} color="#00AEEF" />
          <Text style={styles.detailText}>{event.sport}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="barbell-outline" size={20} color="#00AEEF" />
          <Text style={styles.detailText}>Level:</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#00AEEF" />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={20} color="#00AEEF" />
          <Text style={styles.detailText}>
            {event.city}, {event.location}
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
    </Modal>
    </View>
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
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EventDetails;
