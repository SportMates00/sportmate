import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { users_list } from "@/app/js files/users";
import { setUserInfo } from "@/app/store/userSlice";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Mor", "Aft", "Eve"];

const AvailabilityTable = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [availability, setAvailability] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.reduce((timeAcc, time) => {
        timeAcc[time] = false;
        return timeAcc;
      }, {});
      return acc;
    }, {})
  );
  // Handle completion of client info setup
  function handleClientInfoCompletion() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      })
    );
  }

  // Toggle availability for a specific day and time
  const toggleCell = (day, time) => {
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [time]: !availability[day][time],
      },
    };

    setAvailability(updatedAvailability);

    // Update Redux state with the new availability
    dispatch(
      setUserInfo({
        ...userInfo,
        profileInfo: {
          ...userInfo.profileInfo,
          availability: updatedAvailability,
        },
      })
    );
  };

  // Check if at least one slot is selected
  const isAtLeastOneSelected = () => {
    return Object.values(availability).some((day) =>
      Object.values(day).some((time) => time)
    );
  };

  // Handle Get Started button click
  const handleGetStarted = () => {
    if (!isAtLeastOneSelected()) {
      Alert.alert("Error", "Please select at least one availability slot.");
      return;
    }
    try {
      // Add userInfo to AsyncStorage
      users_list.push(userInfo);
      dispatch(setUserInfo(userInfo));
      handleClientInfoCompletion();
      console.log('USER INFO NEW I', userInfo)
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.cell,
                  availability[day][time] && styles.selectedCell,
                ]}
                onPress={() => toggleCell(day, time)}
              />
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#00bcd4",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AvailabilityTable;
