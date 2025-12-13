import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/theme/themeContext";

const EditAvailabilityTable = ({ editUser, setEditUser }) => {
  const { t } = useTranslation();

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const days = [
    { key: 'Mon', label: t('Mon') },
    { key: 'Tue', label: t('Tue') },
    { key: 'Wed', label: t('Wed') },
    { key: 'Thu', label: t('Thu') },
    { key: 'Fri', label: t('Fri') },
    { key: 'Sat', label: t('Sat') },
    { key: 'Sun', label: t('Sun') }
  ];

  const times = [
    { key: 'Mor', label: t('Mor') },
    { key: 'Aft', label: t('Aft') },
    { key: 'Eve', label: t('Eve') }
  ];

  const toggleCell = (day, time) => {
    const updatedAvailability = {
      ...editUser.profileInfo.availability,
      [day]: {
        ...editUser.profileInfo.availability[day],
        [time]: !editUser.profileInfo.availability[day][time],
      },
    };

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
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.emptyCell} />
        {days.map((day, index) => (
          <Text key={index} style={[styles.headerCell, styles.textCenter]}>
            {day.label}
          </Text>
        ))}
      </View>

      {/* Body */}
      {times.map((time, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          <Text style={[styles.cell, styles.headerCell, styles.textCenter]}>
            {time.label}
          </Text>

          {days.map((day, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                editUser.profileInfo.availability[day.key][time.key] && styles.selectedCell,
              ]}
              onPress={() => toggleCell(day.key, time.key)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default EditAvailabilityTable;

const getStyles = (theme) => StyleSheet.create({
  table: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    backgroundColor: theme.colors.background,
  },

  row: {
    flexDirection: "row",
    flex: 1,
  },

  emptyCell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.background,
  },

  cell: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.background,
  },

  selectedCell: {
    backgroundColor: theme.colors.primary,
  },

  headerCell: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    lineHeight: 45,
    borderWidth: 1,
    borderColor: theme.colors.text,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
    backgroundColor: theme.colors.background,
  },

  textCenter: {
    textAlign: "center",
  },
});
