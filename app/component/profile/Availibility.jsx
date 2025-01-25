import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AvailabilityTable = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [availability, setAvailability] = useState(null);

  // Fetch loggedUser and set availability
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("loggedUser");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setLoggedUser(parsedUser);

          // Extract and set availability from the loggedUser data
          const userAvailability = parsedUser.profileInfo.availibility;
          setAvailability(userAvailability);
        }
      } catch (error) {
        console.error("Error fetching logged user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!loggedUser || !availability) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading availability...</Text>
      </View>
    );
  }

  const days = Object.keys(availability);
  const times = Object.keys(availability[days[0]]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Availability</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.row}>
          <View style={styles.cell} />
          {days.map((day, index) => (
            <Text key={index} style={styles.headerCell}>
              {day}
            </Text>
          ))}
        </View>
        {/* Table Body */}
        {times.map((time, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.headerCell}>{time}</Text>
            {days.map((day, colIndex) => (
              <View
                key={`${rowIndex}-${colIndex}`} // Unique key
                style={[
                  styles.cell,
                  availability[day][time] && styles.selectedCell,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight:'bold'
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCell: {
    backgroundColor: "#00bcd4",
  },
  headerCell: {
    width: 40,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default AvailabilityTable;
