import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FbBg from "../../../../../assets/images/favicon.png";
import PlayersComp from "./PlayersComp";
import ExtraDetails from "./ExtraDetails";

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
              <TouchableOpacity style={{zIndex:20,padding:20}} onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={26} color={'white'}/>
              </TouchableOpacity>
              <Image source={FbBg} style={styles.headerBackground}/>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Played</Text>
                <Text style={styles.eventTitle}>Natalie's squash match</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
            </View>
            <PlayersComp event={event}/>
            <ExtraDetails event={event}/>
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 0,
  },
  headerContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#ccc", // fallback color
    position: "relative",
  },
  headerBackground: {
    position:'absolute',
    width: "100%",
    height: 250,
  },
  statusBadge:{
    position:'absolute',
    bottom:20,
    left:20
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    backgroundColor:'green',
    width:80,
    textAlign:'center',
    padding:5,
    fontSize: 14,
  },
  eventTitle: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  eventDate: {
    color: "red",
    fontSize: 16,
  },
});

export default EventDetails;