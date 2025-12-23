import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";

/* ---------------- CONSTANTS ---------------- */

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"];

const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00",
  "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00",
  "21:00", "22:00",
];

const TIME_RANGES = [
  { key: "morning", label: "Morning", range: "06:00 – 12:00" },
  { key: "afternoon", label: "Afternoon", range: "12:00 – 18:00" },
  { key: "evening", label: "Evening", range: "18:00 – 23:00" },
];

const DURATIONS = [
  { key: 60, label: "1 hour" },
  { key: 90, label: "1.5 hours" },
  { key: 120, label: "2 hours" },
];

/* ---------------- COMPONENT ---------------- */

const CreateGame2 = ({ draftGame, setDraftGame }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  /* ---------- LOCAL STATE ---------- */
  const [levels, setLevels] = useState(draftGame.level || []);
  const [maxPlayers, setMaxPlayers] = useState(draftGame.maxPlayers || null);
  const [verifiedOnly, setVerifiedOnly] = useState(draftGame.verifiedOnly || false);
  const [courtBooked, setCourtBooked] = useState(draftGame.courtBooked || false);

  const [isFlexible, setIsFlexible] = useState(draftGame.isFlexible || false);
  const [selectedDay, setSelectedDay] = useState(draftGame.date ? new Date(draftGame.date) : null);

  const [timeMode, setTimeMode] = useState(draftGame.timeMode || "exact");
  const [selectedTime, setSelectedTime] = useState(draftGame.time || null);
  const [duration, setDuration] = useState(draftGame.duration || null);
  const [ranges, setRanges] = useState(draftGame.timeRanges || []);

  /* ---------- DAYS ---------- */
  const dayOptions = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  const sameDay = (a, b) =>
    a && b && a.toDateString() === b.toDateString();

  /* ---------- HELPERS ---------- */
  const toggleLevel = (lvl) => {
    setLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [lvl]
    );
  };

  const toggleRange = (key) => {
    setRanges((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [key]
    );
  };

  /* ---------- SYNC TO DRAFT ---------- */
  useEffect(() => {
    setDraftGame((prev) => ({
      ...prev,
      level: levels,
      maxPlayers,
      verifiedOnly,
      courtBooked,
      isFlexible,
      date: selectedDay ? selectedDay.toISOString() : null,
      timeMode,
      time: selectedTime,
      duration,
      timeRanges: ranges,
    }));
  }, [
    levels,
    maxPlayers,
    verifiedOnly,
    courtBooked,
    isFlexible,
    selectedDay,
    timeMode,
    selectedTime,
    duration,
    ranges,
  ]);

  return (
    <View style={styles.page}>
      {/* ================= MATCH LEVEL ================= */}
      <Text style={styles.sectionTitle}>Match level</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LEVELS.map((lvl) => {
          const active = levels.includes(lvl);
          return (
            <TouchableOpacity
              key={lvl}
              onPress={() => toggleLevel(lvl)}
              style={[styles.levelCard, active && styles.levelCardActive]}
            >
              <Text style={styles.levelCardText}>{lvl}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= MAX PLAYERS ================= */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
        Maximum players
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 20 }, (_, i) => i + 2).map((n) => {
          const active = maxPlayers === n;
          return (
            <TouchableOpacity
              key={n}
              onPress={() => setMaxPlayers(n)}
              style={[styles.numBox, active && styles.numBoxActive]}
            >
              <Text style={styles.numText}>{n}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= SWITCHES ================= */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Verified users only</Text>
        <Switch value={verifiedOnly} onValueChange={setVerifiedOnly} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Court booked</Text>
        <Switch value={courtBooked} onValueChange={setCourtBooked} />
      </View>

      {/* ================= DAY PICKER ================= */}
      <Text style={styles.sectionTitle}>When</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setIsFlexible(!isFlexible)}
          style={[styles.dayPill, isFlexible && styles.dayPillActive]}
        >
          <Text style={styles.dayPillText}>I’m flexible</Text>
        </TouchableOpacity>

        {dayOptions.map((d) => {
          const active = sameDay(selectedDay, d);
          const label =
            d.toDateString() === new Date().toDateString()
              ? "Today"
              : d.toLocaleDateString([], { weekday: "short", day: "numeric" });

          return (
            <TouchableOpacity
              key={d.toISOString()}
              disabled={isFlexible}
              onPress={() => setSelectedDay(d)}
              style={[
                styles.dayPill,
                active && styles.dayPillActive,
                isFlexible && styles.disabledPill,
              ]}
            >
              <Text style={styles.dayPillText}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= TIME MODE ================= */}
      {!isFlexible && (
        <>
          <View style={styles.timeModeRow}>
            <TouchableOpacity
              onPress={() => setTimeMode("exact")}
              style={[
                styles.timeModeBtn,
                timeMode === "exact" && styles.timeModeBtnActive,
              ]}
            >
              <Text style={styles.timeModeText}>Exact hours</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTimeMode("range")}
              style={[
                styles.timeModeBtn,
                timeMode === "range" && styles.timeModeBtnActive,
              ]}
            >
              <Text style={styles.timeModeText}>Time ranges</Text>
            </TouchableOpacity>
          </View>

          {timeMode === "exact" ? (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {TIME_SLOTS.map((t) => {
                  const active = selectedTime === t;
                  return (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setSelectedTime(t)}
                      style={[styles.timeSlot, active && styles.timeSlotActive]}
                    >
                      <Text style={styles.timeSlotText}>{t}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {DURATIONS.map((d) => {
                  const active = duration === d.key;
                  return (
                    <TouchableOpacity
                      key={d.key}
                      onPress={() => setDuration(d.key)}
                      style={[styles.pill, active && styles.pillActive]}
                    >
                      <Text style={styles.pillText}>{d.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TIME_RANGES.map((r) => {
                const active = ranges.includes(r.key);
                return (
                  <TouchableOpacity
                    key={r.key}
                    onPress={() => toggleRange(r.key)}
                    style={[styles.rangeCard, active && styles.rangeCardActive]}
                  >
                    <Text style={styles.rangeTitle}>{r.label}</Text>
                    <Text style={styles.rangeSub}>{r.range}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default CreateGame2;


const getStyles = (theme) =>
  StyleSheet.create({
    page: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 90,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 12,
    },

    /* LEVEL */
    levelCard: {
      padding: 14,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      marginRight: 10,
      backgroundColor: "#fff",
    },
    levelCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    levelCardText: {
      fontWeight: "800",
      color: theme.colors.text,
    },

    /* NUMBERS */
    numBox: {
      width: 46,
      height: 46,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    numBoxActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    numText: {
      fontWeight: "800",
      color: theme.colors.text,
    },

    /* SWITCH */
    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    switchLabel: {
      fontWeight: "700",
      color: theme.colors.text,
    },

    /* DAY */
    dayPill: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      marginRight: 10,
    },
    dayPillActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    dayPillText: {
      fontWeight: "700",
      color: theme.colors.text,
    },

    /* TIME */
    timeModeRow: {
      flexDirection: "row",
      gap: 10,
      marginVertical: 10,
    },
    timeModeBtn: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      alignItems: "center",
    },
    timeModeBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    timeModeText: {
      fontWeight: "800",
      color: theme.colors.text,
    },

    timeSlot: {
      padding: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#ddd",
      marginRight: 10,
    },
    timeSlotActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    timeSlotText: {
      fontWeight: "800",
      color: theme.colors.text,
    },

    pill: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      marginRight: 10,
    },
    pillActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    pillText: {
      fontWeight: "700",
      color: theme.colors.text,
    },

    rangeCard: {
      width: 150,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 12,
      marginRight: 10,
    },
    rangeCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    rangeTitle: {
      fontWeight: "900",
      color: theme.colors.text,
    },
    rangeSub: {
      opacity: 0.7,
      fontWeight: "700",
      marginTop: 6,
    },

    disabledPill: {
      opacity: 0.4,
    },
  });
