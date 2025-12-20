// CreateGame.jsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@/src/theme/themeContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const SPORTS = [
  { key: "Football", label: "Football" },
  { key: "Tennis", label: "Tennis" },
  { key: "Basketball", label: "Basketball" },
];

const LEVELS = [
  "Starter",
  "Beginner",
  "Lower Intermediate",
  "Intermediate",
  "Advanced",
  "Professional",
];

// Auto background images (Step 5)
const SPORT_BACKGROUNDS = {
  Football: require("../../../assets/images/football.png"),
  Tennis: require("../../../assets/images/tennis.png"),
  Basketball: require("../../../assets/images/basketball.png"),
};

const GAME_TYPES = ["Practice", "Match", "Tournament"];

const CreateGame = () => {
  const route = useRoute();
  const { loggedUser, addGame, editGame, mode = "create", game } = route.params || {};
  // mode: "create" | "edit"
  // If you navigate for edit, pass: { mode: "edit", game, editGame, loggedUser }

  if (!loggedUser || (mode === "create" && !addGame) || (mode === "edit" && !editGame) || (mode === "edit" && !game)) {
    return null;
  }

  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const isEdit = mode === "edit";

  // ---------- Prefill (Step 6) ----------
  const initialSport = isEdit ? game?.sport ?? null : null;
  const initialLevels = useMemo(() => {
    const lv = isEdit ? game?.level : [];
    if (Array.isArray(lv)) return lv;
    if (typeof lv === "string" && lv.trim()) return [lv];
    return [];
  }, [isEdit, game]);

  const parseStartAt = (g) => {
    // Prefer startAt, fallback to date+time strings if any (best-effort)
    if (g?.startAt) {
      const d = new Date(g.startAt);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  };

  const initialStart = isEdit ? parseStartAt(game) : null;

  // BASIC FORM STATE
  const [sport, setSport] = useState(initialSport);
  const [gameType, setGameType] = useState(isEdit ? (game?.gameType || "Practice") : "Practice");
  const [levels, setLevels] = useState(initialLevels);

  // Date & time pickers (kept cross-platform)
  const [date, setDate] = useState(isEdit && initialStart ? initialStart : null); // Date object
  const [time, setTime] = useState(isEdit && initialStart ? initialStart : null); // Date object
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [maxPlayers, setMaxPlayers] = useState(
    String(isEdit ? (game?.maxPlayers ?? 10) : 10)
  );

  // Step 4: Verified-only toggle
  const [verifiedOnly, setVerifiedOnly] = useState(Boolean(isEdit ? game?.verifiedOnly : false));

  // Optional: custom title (keeps default if empty)
  const [customTitle, setCustomTitle] = useState(isEdit ? (game?.title || "") : "");

  const backgroundImage = sport ? SPORT_BACKGROUNDS[sport] || null : null;

  const safeFirstName =
    loggedUser?.profileInfo?.firstName ||
    loggedUser?.profileInfo?.name ||
    "User";

  const safeHostVerified = Boolean(loggedUser?.verified);

  const buildStartAt = () => {
    if (!date || !time) return null;

    // Combine chosen date + chosen time into one Date
    const combined = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    if (isNaN(combined.getTime())) return null;
    return combined;
  };

  const formatTime = (d) => {
    // Cross-platform safe formatting
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmit = () => {
    if (!sport) return;
    if (!date || !time) return;
    if (levels.length === 0) return;

    const start = buildStartAt();
    if (!start) return;

    const maxPlayersNum = Number(maxPlayers);
    if (!Number.isFinite(maxPlayersNum) || maxPlayersNum < 2) return;

    const title =
      (customTitle || "").trim() ||
      `${safeFirstName}'s ${sport} ${gameType.toLowerCase()} game`;

    const payload = {
      // Keep id for edit; create new for create
      id: isEdit ? game.id : Date.now(),

      sport,
      title,
      backgroundImage,

      // UI fields (human-friendly)
      date: start.toDateString(),
      time: formatTime(start),

      // logic field
      startAt: start.toISOString(),
      timezone: "GMT+4",

      gameType,
      level: levels, // array
      maxPlayers: maxPlayersNum,

      host: {
        id: isEdit ? (game?.host?.id || loggedUser.id) : loggedUser.id,
        name: isEdit ? (game?.host?.name || safeFirstName) : safeFirstName,
        profilePhoto: isEdit ? (game?.host?.profilePhoto || loggedUser?.profileInfo?.profilePhoto || loggedUser?.profilePhoto) : (loggedUser?.profileInfo?.profilePhoto || loggedUser?.profilePhoto),
        verified: isEdit ? Boolean(game?.host?.verified) : safeHostVerified,
      },

      // Keep existing players/pendingRequests when editing; create defaults when creating
      players: isEdit
        ? (Array.isArray(game?.players) ? game.players : [])
        : [
            {
              id: loggedUser.id,
              name: safeFirstName,
              profilePhoto: loggedUser?.profileInfo?.profilePhoto || loggedUser?.profilePhoto,
            },
          ],

      pendingRequests: isEdit
        ? (Array.isArray(game?.pendingRequests) ? game.pendingRequests : [])
        : [],

      verifiedOnly,
      visibility: isEdit ? (game?.visibility || "public") : "public",
      chatEnabled: isEdit ? (game?.chatEnabled ?? true) : true,
      chatId: isEdit ? (game?.chatId || `chat_game_${game.id}`) : `chat_game_${Date.now()}`,

      status: isEdit ? (game?.status || "active") : "active",
      createdAt: isEdit ? (game?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEdit) {
      editGame(payload);
    } else {
      addGame(payload);
    }

    navigation.navigate("MyGames");
  };

  // Reusable input (Max players + optional title)
  const Input = ({ label, value, onChange, keyboardType, placeholder }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{isEdit ? "Edit Game" : "Create a Game"}</Text>

      {/* SPORT */}
      <Text style={styles.sectionLabel}>Sport</Text>
      <View style={styles.sportRow}>
        {SPORTS.map((item) => {
          const isActive = sport === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSport(item.key)}
              style={[styles.sportBtn, isActive && styles.sportBtnActive]}
            >
              <Text style={[styles.sportText, isActive && styles.sportTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* GAME TYPE */}
      <Text style={styles.sectionLabel}>Game Type</Text>
      <View style={styles.sportRow}>
        {GAME_TYPES.map((type) => {
          const isActive = gameType === type;
          return (
            <TouchableOpacity
              key={type}
              onPress={() => setGameType(type)}
              style={[styles.typeBtn, isActive && styles.typeBtnActive]}
            >
              <Text style={[styles.typeText, isActive && styles.typeTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LEVEL */}
      <Text style={styles.sectionLabel}>Level</Text>
      <View style={styles.levelRow}>
        {LEVELS.map((lvl) => {
          const isActive = levels.includes(lvl);
          return (
            <TouchableOpacity
              key={lvl}
              onPress={() => {
                setLevels((prev) =>
                  isActive ? prev.filter((x) => x !== lvl) : [...prev, lvl]
                );
              }}
              style={[styles.levelChip, isActive && styles.levelChipActive]}
            >
              <Text style={[styles.levelText, isActive && styles.levelTextActive]}>
                {lvl}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DATE */}
      <Text style={styles.sectionLabel}>Date</Text>
      <TouchableOpacity style={styles.dateBtn} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{date ? date.toDateString() : "Select date"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            // Android: event.type === 'dismissed' when cancelled
            if (Platform.OS === "android") setShowDatePicker(false);
            if (event?.type === "dismissed") return;
            if (selectedDate) setDate(selectedDate);
            if (Platform.OS === "ios") setShowDatePicker(false);
          }}
        />
      )}

      {/* TIME */}
      <Text style={styles.sectionLabel}>Time</Text>
      <TouchableOpacity style={styles.dateBtn} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>
          {time ? formatTime(time) : "Select time"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedTime) => {
            if (Platform.OS === "android") setShowTimePicker(false);
            if (event?.type === "dismissed") return;
            if (selectedTime) setTime(selectedTime);
            if (Platform.OS === "ios") setShowTimePicker(false);
          }}
        />
      )}

      {/* Step 4: Verified-only */}
      <View style={styles.switchRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionLabel}>Verified users only</Text>
          <Text style={styles.helperText}>
            Only verified users can request to join this game.
          </Text>
        </View>

        <Switch
          value={verifiedOnly}
          onValueChange={setVerifiedOnly}
          trackColor={{ false: "#ccc", true: theme.colors.primary }}
          thumbColor={Platform.OS === "android" ? "#fff" : undefined}
        />
      </View>

      {/* Optional: Title */}
      <Input
        label="Title (optional)"
        value={customTitle}
        onChange={setCustomTitle}
        placeholder={`${safeFirstName}'s ${sport || "Sport"} game`}
      />

      {/* Max Players */}
      <Input
        label="Max Players"
        value={maxPlayers}
        onChange={setMaxPlayers}
        keyboardType="numeric"
        placeholder="10"
      />

      {/* Submit */}
      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
        <Text style={styles.createText}>{isEdit ? "Save Changes" : "Create Game"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    sectionLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    helperText: {
      color: theme.colors.text,
      opacity: 0.7,
      fontSize: 12,
      marginTop: -6,
      fontFamily: theme.fonts.family,
    },

    inputLabel: {
      marginBottom: 6,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.family,
    },

    sportRow: {
      flexDirection: "row",
      marginBottom: 20,
      flexWrap: "wrap",
    },

    sportBtn: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: "#eee",
      marginRight: 10,
      marginBottom: 10,
    },
    sportBtnActive: {
      backgroundColor: theme.colors.primary,
    },
    sportText: {
      fontWeight: "600",
      color: "#555",
      fontFamily: theme.fonts.family,
    },
    sportTextActive: {
      color: theme.colors.buttonText,
    },

    typeBtn: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: "#eee",
      marginRight: 10,
      marginBottom: 10,
    },
    typeBtnActive: {
      backgroundColor: theme.colors.primary,
    },
    typeText: {
      fontWeight: "600",
      color: "#555",
      fontFamily: theme.fonts.family,
    },
    typeTextActive: {
      color: theme.colors.buttonText,
    },

    levelRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    levelChip: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 16,
      backgroundColor: "#eee",
      marginRight: 8,
      marginBottom: 8,
    },
    levelChipActive: {
      backgroundColor: theme.colors.primary,
    },
    levelText: {
      fontWeight: "600",
      color: "#555",
      fontSize: 13,
      fontFamily: theme.fonts.family,
    },
    levelTextActive: {
      color: theme.colors.buttonText,
    },

    dateBtn: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 14,
      marginBottom: 20,
      backgroundColor: theme.colors.background,
    },
    dateText: {
      fontSize: 15,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      gap: 12,
    },

    createBtn: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    createText: {
      color: theme.colors.buttonText,
      fontWeight: "700",
      fontSize: 16,
      fontFamily: theme.fonts.family,
    },
  });

export default CreateGame;
