import { useTheme } from "@/app/theme/themeContext";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const AvailabilityTable = ({loggedUser}) => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const days = Object.keys(loggedUser.profileInfo.availability);
  const times = Object.keys(loggedUser.profileInfo.availability[days[0]]);
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
                  loggedUser.profileInfo.availability[day][time] && styles.selectedCell,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: theme.fonts.size.large,
    marginBottom: theme.spacing.medium,
    fontWeight:'bold',
    color:theme.colors.text
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: theme.radius.semiCircle,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flexGrow:1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCell: {
    backgroundColor: theme.colors.primary,
  },
  headerCell: {
    flex:1,
    height: '100%',
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    color:theme.colors.text
  }
});

export default AvailabilityTable;
