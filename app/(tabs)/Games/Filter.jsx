// Filter.jsx
import React, { useState, useEffect } from "react";
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";

const Filter = ({ onClose, onApplyFilters = () => {}, currentFilters }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const [selectedFilters, setSelectedFilters] = useState(
    currentFilters || { skillLevel: [], location: [], date: [], time: [] }
  );

  useEffect(() => {
    setSelectedFilters(
      currentFilters || { skillLevel: [], location: [], date: [], time: [] }
    );
  }, [currentFilters]);

  const TIME_OPTIONS = [
  { key: "morning", label: t("FilterTimeMorning"), range: '6AM - 12PM' },
  { key: "afternoon", label: t("FilterTimeAfternoon"), range: '12PM - 6PM'},
  { key: "evening", label: t("FilterTimeEvening"), range: '6PM - 10PM' },
  { key: "latenight", label: t("FilterTimeLateNight"), range: '10PM - 6AM' },
];

  const filterOptions = {
    skillLevel: [
      t("FilterLevelBeginner"),
      t("FilterLevelIntermediate"),
      t("FilterLevelAdvanced"),
    ],
    location: [
      t("FilterCityYerevan"),
      t("FilterCityGyumri"),
      t("FilterCityVanadzor"),
      t("FilterCityAbovyan"),
      t("FilterCityHrazdan"),
      t("FilterCityDilijan"),
      t("FilterCityArtashat"),
      t("FilterCityKapan"),
      t("FilterCityGoris"),
    ],
    date: [
      t("FilterDateToday"),
      t("FilterDateThisWeek"),
      t("FilterDateThisMonth"),
    ],
    time: [
      t("FilterTimeMorning"),
      t("FilterTimeAfternoon"),
      t("FilterTimeEvening"),
      t("FilterTimeLateNight"),
    ],
  };

  const toggleOption = (group, option) => {
    setSelectedFilters((prev) => {
      const exists = prev[group].includes(option);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter((v) => v !== option)
          : [...prev[group], option],
      };
    });
  };

  const clearAll = () => {
    setSelectedFilters({ skillLevel: [], location: [], date: [], time: [] });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("FilterEventsTitle")}</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>{t("FilterClearButton")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* SKILL LEVEL */}
        <View style={styles.group}>
          <Text style={styles.groupLabel}>{t("FilterSkillLevel")}</Text>
          {filterOptions.skillLevel.map((option) => {
            const isSelected = selectedFilters.skillLevel.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionRow, isSelected && styles.optionSelected]}
                onPress={() => toggleOption("skillLevel", option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>

                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DATE */}
        <View style={styles.group}>
          <Text style={styles.groupLabel}>{t("FilterDate")}</Text>
          {filterOptions.date.map((option) => {
            const isSelected = selectedFilters.date.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionRow, isSelected && styles.optionSelected]}
                onPress={() => toggleOption("date", option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>

                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

                {/* TIME */}
        <View style={styles.group}>
          <Text style={styles.groupLabel}>{t("FilterTime")}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TIME_OPTIONS.map(({ key, label, range }) => {
              const isSelected = selectedFilters.time.includes(key);

              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.timeBox, isSelected && styles.timeBoxSelected]}
                  onPress={() => toggleOption("time", key)}
                >
                  <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                    {label}
                  </Text>

                  <Text
                    style={[
                      styles.timeRange,
                      isSelected && styles.timeRangeSelected,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
         {/* LOCATION */}
        <View style={styles.group}>
          <Text style={styles.groupLabel}>{t("FilterLocation")}</Text>
          {filterOptions.location.map((option) => {
            const isSelected = selectedFilters.location.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionRow, isSelected && styles.optionSelected]}
                onPress={() => toggleOption("location", option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>

                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>{t("FilterCancelButton")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => {
            onApplyFilters(selectedFilters);
            onClose();
          }}
        >
          <Text style={styles.applyText}>{t("FilterApplyButton")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "700",
      color: "#333",
    },
    clearText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: "500",
    },

    group: {
      marginBottom: 25,
    },
    groupLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },

    optionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#f2f2f2",
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    optionSelected: {
      backgroundColor: theme.colors.primary,
    },
    optionText: {
      fontSize: 14,
      color: "#333",
    },
    optionTextSelected: {
      color: "#fff",
      fontWeight: "bold",
    },

    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    timeBox: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: "#f2f2f2",
      borderRadius: 12,
      marginRight: 10,
      minWidth: 130,
    },
    timeBoxSelected: {
      backgroundColor: theme.colors.primary,
    },
    timeText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333",
    },
    timeTextSelected: {
      color: "#fff",
    },
    timeRange: {
      fontSize: 12,
      color: "#666",
      marginTop: 3,
    },
    timeRangeSelected: {
      color: "#fff",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    cancelBtn: {
      flex: 1,
      backgroundColor: "#eee",
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      marginRight: 10,
    },
    applyBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      marginLeft: 10,
    },
    cancelText: {
      color: "#333",
      fontSize: 16,
      fontWeight: "500",
    },
    applyText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
export default Filter;