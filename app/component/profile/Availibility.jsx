import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';




const AvailabilityTable = ({loggedUser}) => {


    const days = loggedUser.profileInfo.availibility.days;
    const times = loggedUser.profileInfo.availibility.times;

    const [availability, setAvailability] = useState(
    Array(times.length).fill(Array(days.length).fill(false))
     );
    const navigation = useNavigation();
    // Toggle availability for a specific cell
    const toggleCell = (row, col) => {
    const newAvailability = availability.map((rowData, rowIndex) =>
      rowIndex === row
        ? rowData.map((cell, cellIndex) =>
            cellIndex === col ? !cell : cell
          )
        : rowData
    );
    setAvailability(newAvailability);
  };
console.log(availability)
  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Availability</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell} />
          {days.map((day, index) => (
            <Text key={index} style={styles.headerCell}>
              {day}
            </Text>
          ))}
        </View>
        {times.map((time, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.headerCell}>{time}</Text>
            {days.map((_, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.cell,
                  availability[rowIndex][colIndex] && styles.selectedCell,
                ]}
                onPress={() => toggleCell(rowIndex, colIndex)}
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
    flexGrow: 1,
    padding: 16,
    width:'100%',
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