import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FbBg from "../../../../assets/images/football-bg.png";

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
            <ImageBackground source={require("../../../../assets/images/football-bg.png")} style={styles.headerBackground} resizeMode="cover">
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>Played</Text>
      </View>
      <Text style={styles.eventTitle}>Natalie's squash match</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
    </ImageBackground>
   
          </View>
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
  headerBackground: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    padding: 16,
  },
  statusBadge: {
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  eventTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  eventDate: {
    color: "white",
    fontSize: 16,
  },
});

export default EventDetails;
