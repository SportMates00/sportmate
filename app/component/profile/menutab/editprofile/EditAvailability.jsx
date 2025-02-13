import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Mor", "Aft", "Eve"];

const EditAvailabilityTable = ({ editUser, setEditUser }) => {
  // Handle toggling of availability
  const toggleCell = (day, time) => {
    const updatedAvailability = {
      ...editUser.profileInfo.availability,
      [day]: {
        ...editUser.profileInfo.availability[day],
        [time]: !editUser.profileInfo.availability[day][time],
      },
    };

    // Update the editUser state with the new availability
    setEditUser({
      ...editUser,
      profileInfo: {
        ...editUser.profileInfo,
        availability: updatedAvailability,
      },
    });
  };

  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.row}>
        <View style={styles.emptyCell} /> {/* Empty cell to keep alignment */}
        {days.map((day, index) => (
          <Text key={index} style={[styles.headerCell, styles.textCenter]}>
            {day}
          </Text>
        ))}
      </View>
      {/* Table Body */}
      {times.map((time, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          <Text style={[styles.cell, styles.headerCell, styles.textCenter]}>
            {time}
          </Text>
          {days.map((day, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                editUser.profileInfo.availability[day][time] && styles.selectedCell,
              ]}
              onPress={() => toggleCell(day, time)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%", // Ensure the table takes full width
  },
  row: {
    flexDirection: "row",
    flex: 1, // Make rows take available space equally
  },
  emptyCell: {
    flex:1,
    borderRightWidth:1,
    borderColor: "#ccc", // Ensure empty cell has fixed width
  },
  cell: {
    flex: 1,  // Make cells take equal space within a row
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCell: {
    backgroundColor: "#00bcd4",
  },
  headerCell: {
    flex:1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 45,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textCenter: {
    textAlign: "center",
  }
});

export default EditAvailabilityTable;
