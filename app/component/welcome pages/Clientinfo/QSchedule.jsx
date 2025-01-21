import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Morning", "Afternoon", "Evening"];
const AvailabilityTable = ({step,setStep}) => {
  const [availability, setAvailability] = useState(
    Array(times.length).fill(Array(days.length).fill(false))
  );
  
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
  const navigation = useNavigation();
  // Select all cells
  const selectAll = () => {
    setAvailability(Array(times.length).fill(Array(days.length).fill(true)));
  };

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
      <TouchableOpacity style={styles.button} onPress={selectAll}>
        <Text style={styles.buttonText}>Select All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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