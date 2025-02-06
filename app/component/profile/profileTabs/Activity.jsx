import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import favicon from "@/assets/images/profilepicture.png";
import { useNavigation } from '@react-navigation/native';
import EventDetails from "./EventDetails";

const Activity = ({ completedEvents }) => {
  const navigation = useNavigation();
  completedEvents = [
    {
      sport: "Football",
      location: "NY ST",
      date: "Jan 30, 2025",
      city: "Yerevan",
      region: "",
      teamA: [
        { name: "John", profilePhoto: favicon },
        // { name: "Jane", profilePhoto: favicon }
      ],
      teamB: [
        { name: "Alex", profilePhoto: favicon }
      ]
    },
    {
      sport: "Tennis",
      location: "Miami Court",
      date: "Feb 2, 2025",
      city: "Miami",
      region: "FL",
      teamA: [
        { name: "Chris", profilePhoto: favicon },
        { name: "Emily", profilePhoto: favicon },
        { name: "David", profilePhoto: favicon }
      ],
      teamB: [
        { name: "Michael", profilePhoto: favicon },
        { name: "Sara", profilePhoto: favicon },
        { name: "Luke", profilePhoto: favicon }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {completedEvents.length === 0 ? (
        <Text style={styles.noEvents}>No events have been completed yet.</Text>
      ) : (
        <FlatList
          data={completedEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.topRow}>
                <FontAwesome5 name={item.sport === "Football" ? "futbol" : "table-tennis"} size={30} color="#FF6F61" style={styles.sportIcon} />
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <View style={styles.teamContainer}>
                <View style={styles.teamWrapper}>
                  {item.teamA.length <= 2 ? (
                    item.teamA.map((player, index) => (
                      <View key={index} style={styles.playerContainer}>
                        <Image source={ player.profilePhoto } style={styles.profilePhoto} />
                        <Text style={styles.playerName}>{player.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.teamName}>Team A</Text>
                  )}
                </View>
                <View style={styles.vsContainer}>
                  <Text style={styles.vsText}>vs</Text>
                </View>
                <View style={styles.teamWrapper}>
                  {item.teamB.length <= 2 ? (
                    item.teamB.map((player, index) => (
                      <View key={index} style={styles.playerContainer}>
                        <Image source={ player.profilePhoto} style={styles.profilePhoto} />
                        <Text style={styles.playerName}>{player.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.teamName}>Team B</Text>
                  )}
                </View>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.location}>📍 {item.location}</Text>
                <Text style={styles.cityRegion}> {item.city} {item.region}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { event: completedEvents })} style={styles.button}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    padding: 16,
  },
  noEvents: {
    fontSize: 18,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sportIcon: {
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#FF6F61",
    fontWeight: "bold",
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  teamWrapper: {
    width: "40%",
    alignItems: "center",
  },
  vsContainer: {
    width: "20%",
    alignItems: "center",
  },
  playerContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  profilePhoto: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6F61",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
  },
  cityRegion: {
    fontSize: 16,
    color: "#6C757D",
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

export default Activity;
