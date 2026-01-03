import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";

const CreateGame2 = ({draftGame, setDraftGame}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const levels = [
    { id: "Starter", label: t("Starter") },
    { id: "Beginner", label: t("Beginner") },
    { id: "Lower Intermediate", label: t("Lower Intermediate") },
    { id: "Intermediate", label: t("Intermediate") },
    { id: "Advanced", label: t("Advanced") },
    { id: "Professional", label: t("Professional") },
  ];

  /* ---------- STATE ---------- */
  const [maxPlayers, setMaxPlayers] = useState(draftGame?.maxPlayers);
  const [isFlexible, setIsFlexible] = useState(draftGame?.flexible);
  const [selectedDay, setSelectedDay] = useState(null);

  const [timeMode, setTimeMode] = useState(
    draftGame?.flexible ? "range" : "exact"
  );
  const [startTime, setStartTime] = useState(draftGame?.timeStart);
  const [endTime, setEndTime] = useState(draftGame?.timeEnd);
  const [selectedLevels, setSelectedLevels] = useState(
    draftGame?.level || []
  );

const toggleLevel = (levelId) => {
  setSelectedLevels((prev) => {
    let updated;

    if (prev.includes(levelId)) {
      updated = prev.filter((lvl) => lvl !== levelId);
    } else {
      updated = [...prev, levelId];
    }

    // sync to draftGame also
    setDraftGame((prevGame) => ({
      ...prevGame,
      level: updated,
    }));

    return updated;
  });
};

  /* ---------- HELPERS ---------- */
  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDay = (date, index) => {
    if (index === 0) return t("Today");
    if (index === 1) return t("Tomorrow");

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const generateTimes = (from = 0) => {
    const times = [];
    for (let i = from; i <= 47; i++) {
      const h = String(Math.floor(i / 2)).padStart(2, "0");
      const m = i % 2 === 0 ? "00" : "30";
      times.push(`${h}:${m}`);
    }
    return times;
  };

  const getIndexFromTime = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 2 + (m === 30 ? 1 : 0);
  };

  return (
    <View style={styles.page}>
      {/* MATCH LEVEL */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.section]}>
          {t("MatchLevel")}
        </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {levels.map((level) => {
              const active = selectedLevels.includes(level.id);

              return (
                <TouchableOpacity
                  key={level.id}
                  onPress={() => toggleLevel(level.id)}
                  style={[
                    styles.levelCard,
                    active && styles.levelCardActive
                  ]}
                >
                  <Text style={styles.levelCardText}>
                    {t(level.id)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
      </View>

      {/* MAX PLAYERS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.section]}>
          {t("MaximumPlayers")}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 29 }, (_, i) => i + 2).map((num) => (
           <TouchableOpacity
              key={num}
              onPress={() => setMaxPlayers(num)}
              style={[
                styles.numBox,
                maxPlayers === num && styles.numBoxActive,
              ]}
            ><Text style={styles.numText}>{num}</Text></TouchableOpacity>

          ))}
        </ScrollView>
      </View>

      {/* SWITCHES */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {t("VerifiedUsersOnly")}
          </Text>
          <Switch value={true} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {t("CourtBooked")}
          </Text>
          <Switch value={false} />
        </View>
      </View>

      {/* WHEN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("When")}</Text>

        {/* PICK A DAY */}
        <Text style={styles.subLabel}>{t("PickADay")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* I'M FLEXIBLE — FIRST */}
        <TouchableOpacity
          onPress={() => {
            setIsFlexible(true);
            setSelectedDay(null);
          }}
          style={[
            styles.dayPill,
            isFlexible && styles.dayPillActive,
          ]}
        >
          <Text style={styles.dayPillText}>{t('ImFlexible')}</Text>
        </TouchableOpacity>
          {generateDays().map((day, index) => {
            const active =
              selectedDay &&
              selectedDay.toDateString() === day.toDateString();

            return (
              <TouchableOpacity
                key={index}
                disabled={isFlexible}
                onPress={() => setSelectedDay(day)}
                style={[
                  styles.dayPill,
                  active && styles.dayPillActive,
                  isFlexible && styles.disabledPill,
                ]}
              >
                <Text style={styles.dayPillText}>
                  {formatDay(day, index)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* TIME */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { marginTop: 14 }]}>
          {t("Time")}
        </Text>

        {/* TIME MODE */}
        <View style={styles.timeModeRow}>
          <TouchableOpacity
            onPress={() => {
              setTimeMode("exact");
              setStartTime(null);
              setEndTime(null);
            }}
            style={[
              styles.timeModeBtn,
              timeMode === "exact" && styles.timeModeBtnActive,
            ]}
          >
            <Text style={styles.timeModeText}>
              {t("ExactHours")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTimeMode("range")}
            style={[
              styles.timeModeBtn,
              timeMode === "range" && styles.timeModeBtnActive,
            ]}
          >
            <Text style={styles.timeModeText}>
              {t("TimeRanges")}
            </Text>
          </TouchableOpacity>
        </View>

        {timeMode === "exact" && (
          <>
            {/* START TIME */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {generateTimes().map((tme) => (
                <TouchableOpacity
                  key={tme}
                  onPress={() => {
                    setStartTime(tme);
                    setEndTime(null);
                  }}
                  style={[
                    styles.timeSlot,
                    startTime === tme && styles.timeSlotActive,
                  ]}
                >
                  <Text style={styles.timeSlotText}>{tme}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* END TIME LABEL */}
            {startTime && (
              <Text style={styles.subLabel}>
                {t("SelectEndTime")}
              </Text>
            )}

            {/* END TIME */}
            {startTime && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {generateTimes(getIndexFromTime(startTime) + 1).map(
                  (tme) => (
                    <TouchableOpacity
                      key={tme}
                      onPress={() => setEndTime(tme)}
                      style={[
                        styles.timeSlot,
                        endTime === tme && styles.timeSlotActive,
                      ]}
                    >
                      <Text style={styles.timeSlotText}>{tme}</Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            )}
          </>
        )}

        {timeMode === "range" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.rangeCard}>
              <Text style={styles.rangeTitle}>{t("AnyTime")}</Text>
              <Text style={styles.rangeSub}>{t("Any")}</Text>
            </View>

            <View style={styles.rangeCard}>
              <Text style={styles.rangeTitle}>{t("FilterTimeMorning")}</Text>
              <Text style={styles.rangeSub}>
                6AM – 12PM
              </Text>
            </View>

            <View style={styles.rangeCard}>
              <Text style={styles.rangeTitle}>{t("FilterTimeAfternoon")}</Text>
              <Text style={styles.rangeSub}>
                12PM – 6PM
              </Text>
            </View>

            <View style={styles.rangeCard}>
              <Text style={styles.rangeTitle}>{t("FilterTimeEvening")}</Text>
              <Text style={styles.rangeSub}>
                6PM – 10PM
              </Text>
            </View>

            <View style={styles.rangeCard}>
              <Text style={styles.rangeTitle}>{t("FilterTimeLateNight")}</Text>
              <Text style={styles.rangeSub}>
                10PM – 6AM
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CreateGame2;


const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: 18,
    },
    page: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 90,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 18,
      fontWeight: "700",
    },

    levelCard: {
      width: 110,
      minHeight: 50,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 10,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },

    levelCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    levelCardText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
      fontSize: 12,
      textAlign: "center",
    },

    numBox: {
      width: 45,
      height: 45,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },

    numBoxActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    numText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
    },

    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },

    switchLabel: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
      fontSize: 14,
    },

    dayPill: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      marginRight: 10,
    },

    dayPillActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    dayPillText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "700",
      fontSize: 12,
    },

    timeModeRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 6,
      marginTop: 10,
    },

    timeModeBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },

    timeModeBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    timeModeText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      fontSize: 12,
    },

    timeSlot: {
      marginTop: 8,
      marginBottom: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      marginRight: 10,
    },

    timeSlotActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    timeSlotText: {
      fontFamily: theme.fonts.family,
      fontWeight: "600",
      color: theme.colors.text,
      fontSize: 12,
    },

    pill: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      marginRight: 10,
    },

    pillActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    pillText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
      fontSize: 13,
    },
    subLabel: {
      marginBottom: 8,
      marginTop: 8,
      fontFamily: theme.fonts.family,
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text,
      opacity: 0.7,
    },
    rangeCard: {
      marginTop: 8,
      width: 150,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      backgroundColor: theme.colors.background,
      marginRight: 12,
    },

    rangeCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    rangeTitle: {
      fontFamily: theme.fonts.family,
      fontWeight: "700",
      fontSize: 14,
      color: theme.colors.text,
    },

    rangeSub: {
      marginTop: 6,
      fontFamily: theme.fonts.family,
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.text,
      opacity: 0.7,
    },
  });
