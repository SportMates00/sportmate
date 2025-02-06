import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FbBg from '../../../../assets/images/football-bg.png';

const EventDetails = ({ event, onBack }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Button to open the modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header Section with a Regular Image */}
            <View style={styles.headerContainer}>
              <Image
                source={FbBg} // update path as needed
                style={styles.headerImage}
                resizeMode="cover"
              />
              <View style={styles.headerOverlay} />
              {/* Back Button */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.dateTime}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{event.status}</Text>
                </View>
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* Details Card */}
              <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="football-outline"
                    size={28}
                    color="#00AEEF"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Sport:</Text>
                  <Text style={styles.detailValue}>{event.sport}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="barbell-outline"
                    size={28}
                    color="#00AEEF"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Level:</Text>
                  <Text style={styles.detailValue}>{event.level}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={28}
                    color="#00AEEF"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{event.date}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={28}
                    color="#00AEEF"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>
                    {event.city}, {event.location}
                  </Text>
                </View>
              </View>

              {/* Participants Section */}
              <View style={styles.participantsSection}>
                <Text style={styles.participantsHeader}>Participants</Text>
                {event.participants && event.participants.length > 0 ? (
                  <FlatList
                    horizontal
                    data={event.participants}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.participantContainer}>
                        <View style={styles.participantAvatar}>
                          {item.avatar ? (
                            <Image
                              source={{ uri: item.avatar }}
                              style={styles.avatarImage}
                            />
                          ) : (
                            <Ionicons
                              name="person-outline"
                              size={30}
                              color="#fff"
                            />
                          )}
                        </View>
                        <Text style={styles.participantName}>{item.name}</Text>
                      </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <Text style={styles.noParticipants}>
                    No participants available
                  </Text>
                )}
              </View>

              {/* Action Button (Only Share) */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 20,
  },
  headerContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#ccc", // fallback color
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  eventDate: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  statusBadge: {
    marginTop: 10,
    backgroundColor: "#00AEEF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00AEEF",
    width: 110,
  },
  detailValue: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  participantsSection: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  participantsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  participantContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  participantAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  participantName: {
    fontSize: 14,
    color: "#333",
  },
  noParticipants: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default EventDetails;
