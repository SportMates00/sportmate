import { useTheme } from "@/src/theme/themeContext";
import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { useTranslation } from "react-i18next";

const AvailabilityTable = ({ loggedUser }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  // KEYS stored in DB
  const dayKeys = Object.keys(loggedUser.profileInfo.availability);
  const timeKeys = Object.keys(loggedUser.profileInfo.availability[dayKeys[0]]);

  // LABELS translated using i18n
  const dayLabels = dayKeys.map((key) => ({ key, label: t(key) }));
  const timeLabels = timeKeys.map((key) => ({ key, label: t(key) }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("myFreeTimeProfile")}</Text>

      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.row}>
          <View style={styles.cell} />
          {dayLabels.map((day, index) => (
            <Text key={day.key} style={styles.headerCell}>
              {day.label}
            </Text>
          ))}
        </View>

        {/* Body Rows */}
        {timeLabels.map((time) => (
          <View key={time.key} style={styles.row}>
            <Text style={styles.headerCell}>{time.label}</Text>

            {dayKeys.map((dayKey, colIndex) => (
              <View
                key={`${time.key}-${dayKey}`}
                style={[
                  styles.cell,
                  loggedUser.profileInfo.availability[dayKey][time.key] &&
                    styles.selectedCell,
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
    paddingBottom:40
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
