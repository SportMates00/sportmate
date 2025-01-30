import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const AvailabilityTable = ({loggedUser}) => {

  const days = Object.keys(loggedUser.profileInfo.availibility);
  const times = Object.keys(loggedUser.profileInfo.availibility[days[0]]);

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
                  loggedUser.profileInfo.availibility[day][time] && styles.selectedCell,
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
