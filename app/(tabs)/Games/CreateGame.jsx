// CreateGame.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  Switch,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";

/**
 * =========================
 *  EXAMPLE "DATABASE"
 *  Replace later with your real DB (local file or backend)
 * =========================
 */
const SPORTS = [
  { key: "Football", label: "Football", icon: "football-outline" },
  { key: "Tennis", label: "Tennis", icon: "tennisball-outline" },
  { key: "Basketball", label: "Basketball", icon: "basketball-outline" },
];

const LEVELS = [
  "Starter",
  "Beginner",
  "Lower Intermediate",
  "Intermediate",
  "Advanced",
  "Professional",
];

const TIME_RANGES = [
  { key: "any", label: "Any time", range: "Any" },
  { key: "morning", label: "Morning", range: "6AM - 12PM" },
  { key: "afternoon", label: "Afternoon", range: "12PM - 6PM" },
  { key: "evening", label: "Evening", range: "6PM - 10PM" },
  { key: "latenight", label: "Late night", range: "10PM - 6AM" },
];

// 00:00 to 23:30 each 30 mins
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hh = String(Math.floor(i / 2)).padStart(2, "0");
  const mm = i % 2 === 0 ? "00" : "30";
  return `${hh}:${mm}`;
});

const DURATIONS = [
  { key: 30, label: "30 min" },
  { key: 60, label: "1 hour" },
  { key: 90, label: "1.5 hours" },
  { key: 120, label: "2 hours" },
];

const FIELDS_DB = [
  {
    id: "f1",
    sport: "Football",
    city: "Yerevan",
    address: "Komitas 54",
    name: "Republic Stadium Field",
    image: require("../../../assets/images/football-field.webp"),
    hours: "08:00 - 23:00",
    pricePerHour: 15000,
    currency: "AMD",
    lat: 40.1772,
    lng: 44.50349,
  },
  {
    id: "f2",
    sport: "Football",
    city: "Yerevan",
    address: "Komitas 54",
    name: "Gyumri Central Field",
    image: require("../../../assets/images/football-field.webp"),
    hours: "09:00 - 22:00",
    pricePerHour: 10000,
    currency: "AMD",
    lat: 40.7893,
    lng: 43.8475,
  },
  {
    id: "t1",
    sport: "Tennis",
    city: "Yerevan",
    address: "Komitas 54",
    name: "DSQ Gym & Health Club",
    image: require("../../../assets/images/tennis-court.jpg"),
    hours: "07:00 - 23:00",
    pricePerHour: 12000,
    currency: "AMD",
    lat: 40.2065,
    lng: 44.5136,
  },
  {
    id: "b1",
    sport: "Basketball",
    city: "Yerevan",
    address: "Komitas 54",
    name: "Downtown Indoor Court",
    image: require("../../../assets/images/tennis-court.jpg"),
    hours: "10:00 - 22:00",
    pricePerHour: 8000,
    currency: "AMD",
    lat: 40.1812,
    lng: 44.5149,
  },
];

const priceDisclaimer =
  "Prices are estimates and may change depending on the venue’s latest rates.";

function formatMoney(amount, currency = "AMD") {
  if (amount == null) return "";
  // simple formatting without Intl (more consistent across RN builds)
  return `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`;
}

function getNextDays(count = 7) {
  const now = new Date();
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

function sameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toISOWithLocalOffset(dateObj) {
  // ISO with local timezone offset for clarity (works cross-platform)
  const pad = (n) => String(n).padStart(2, "0");
  const d = dateObj;

  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  const ss = pad(d.getSeconds());

  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const offH = pad(Math.floor(Math.abs(offsetMin) / 60));
  const offM = pad(Math.abs(offsetMin) % 60);

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}${sign}${offH}:${offM}`;
}

export default function CreateGame() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { loggedUser, addGame } = route.params || {};
  if (!loggedUser || !addGame) return null;

  // -------- Defaults from signup info (as you requested) --------
  const defaultSport =
    loggedUser?.profileInfo?.mainSport;

  const defaultLevel =
    loggedUser?.profileInfo?.level ||
    loggedUser?.profileInfo?.sportLevel ||
    loggedUser?.profileInfo?.matchLevel ||
    null;

  // -------- Wizard step --------
  const [step, setStep] = useState(1); // 1,2,3

  // -------- Step 1: sport + location/field --------
  const [sport, setSport] = useState(defaultSport);
  const sportFields = useMemo(
    () => FIELDS_DB.filter((f) => f.sport === sport),
    [sport]
  );

      const [locationQuery, setLocationQuery] = useState("");
      const filteredVenues = useMemo(() => {
        if (!sport) return [];

        return FIELDS_DB.filter(
          (v) =>
            v.sport === sport &&
            v.name.toLowerCase().includes(locationQuery.toLowerCase())
        );
      }, [sport, locationQuery]);
      const [venueId, setVenueId] = useState(null);
      const selectedVenue = useMemo(
        () => filteredVenues.find((v) => v.id === venueId) || null,
        [filteredVenues, venueId]
      );

          useEffect(() => {
      if (filteredVenues.length > 0) {
        setVenueId(filteredVenues[0].id);
      } else {
        setVenueId(null);
      }
    }, [sport]); // only when sport changes

    const [showVenueList, setShowVenueList] = useState(false);
    const [venueAnchor, setVenueAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });



  const openMaps = async () => {
    if (!selectedVenue?.lat || !selectedVenue?.lng) return;

    const { lat, lng, name } = selectedVenue;
    const label = encodeURIComponent(name || "Venue");
    const latLng = `${lat},${lng}`;

    // universal google maps url works on both, opens installed app if available
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${latLng}&query_place_id=${label}`;

    // Apple maps (iOS) fallback
    const appleUrl = `http://maps.apple.com/?q=${label}&ll=${latLng}`;

    try {
      if (Platform.OS === "ios") {
        const canApple = await Linking.canOpenURL(appleUrl);
        if (canApple) return Linking.openURL(appleUrl);
      }
      return Linking.openURL(googleUrl);
    } catch (e) {
      // ignore
    }
  };

  // -------- Step 2: levels + opponents + schedule --------
  const [levels, setLevels] = useState(() => {
    if (!defaultLevel) return [];
    return Array.isArray(defaultLevel) ? defaultLevel.slice(0, 2) : [defaultLevel];
  });

  const toggleLevel = (lvl) => {
    setLevels((prev) => {
      const exists = prev.includes(lvl);
      if (exists) return prev.filter((x) => x !== lvl);

      // limit to 2
      if (prev.length >= 2) return prev;
      return [...prev, lvl];
    });
  };

  // Opponents 2..30 (your request)
  const [maxOpponents, setMaxOpponents] = useState(2);

  // Verified users only switch (replacing "court booked" in screenshot)
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Court booked: if true => exact day/time + duration only (your rule)
  const [courtBooked, setCourtBooked] = useState(false);

  // Flexible scheduling switch
  const [isFlexible, setIsFlexible] = useState(false);

  // Choose day (when not flexible)
  const dayOptions = useMemo(() => getNextDays(7), []);
  const [selectedDay, setSelectedDay] = useState(dayOptions[0]);

  // Time mode: "exact" | "range"
  const [timeMode, setTimeMode] = useState("range");

  useEffect(() => {
    // If court booked, force exact
    if (courtBooked) setTimeMode("exact");
  }, [courtBooked]);

  useEffect(() => {
    // If flexible, disable day/time details
    if (isFlexible) {
      setTimeMode("range");
      setSelectedRanges(["any"]);
      setSelectedTimeSlot(null);
      setDurationMinutes(60);
    }
  }, [isFlexible]);

  // Ranges selection (limit to 2)
  const [selectedRanges, setSelectedRanges] = useState(["any"]);

  const toggleRange = (key) => {
    setSelectedRanges((prev) => {
      const exists = prev.includes(key);
      if (exists) {
        const next = prev.filter((x) => x !== key);
        return next.length === 0 ? ["any"] : next;
      } else {
        // "any" is exclusive
        if (key === "any") return ["any"];
        const withoutAny = prev.filter((x) => x !== "any");
        if (withoutAny.length >= 2) return withoutAny; // limit 2
        return [...withoutAny, key];
      }
    });
  };

  // Exact time selection & duration
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // "HH:MM"
  const [durationMinutes, setDurationMinutes] = useState(60);

  // -------- Step 3: invite friends + notes --------
  const [notes, setNotes] = useState("");
  const [inviteModal, setInviteModal] = useState(false);

  const friends = useMemo(() => {
    const a = loggedUser?.profileInfo?.friends;
    const b = loggedUser?.friends;
    const list = Array.isArray(a) ? a : Array.isArray(b) ? b : [];
    // Normalize {id,name,profilePhoto}
    return list.map((f, idx) => ({
      id: f.id || f.userId || String(idx),
      name: f.name || f.fullName || "Friend",
      profilePhoto: f.profilePhoto || f.avatar || null,
    }));
  }, [loggedUser]);

  const [invitedIds, setInvitedIds] = useState([]);

  const toggleInvite = (id) => {
    setInvitedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // -------- Validation per step --------
  const canGoStep2 = Boolean(sport) && Boolean(selectedVenue);
  const canGoStep3 = Boolean(levels.length) && maxOpponents >= 2;

  // schedule requirement:
  // - if flexible: ok
  // - else if courtBooked: need selectedDay + exact time + duration
  // - else:
  //    - need selectedDay
  //    - if exact => time + duration
  //    - if range => at least 1 range
  const scheduleOk = useMemo(() => {
    if (isFlexible) return true;
    if (!selectedDay) return false;

    if (courtBooked) {
      return Boolean(selectedTimeSlot) && Boolean(durationMinutes);
    }

    if (timeMode === "exact") {
      return Boolean(selectedTimeSlot) && Boolean(durationMinutes);
    }

    // range mode
    return selectedRanges.length > 0;
  }, [
    isFlexible,
    selectedDay,
    courtBooked,
    timeMode,
    selectedTimeSlot,
    durationMinutes,
    selectedRanges,
  ]);

  const canCreate = canGoStep2 && canGoStep3 && scheduleOk;

  // -------- Create game payload (DB-driven selections) --------
  const handleCreate = () => {
    if (!canCreate) return;

    const hostName =
      loggedUser?.profileInfo?.firstName ||
      loggedUser?.profileInfo?.name ||
      "User";

    // Build a "startAt" only when exact time chosen and not flexible
    let startAtISO = null;
    if (!isFlexible && selectedDay && selectedTimeSlot) {
      const [hh, mm] = selectedTimeSlot.split(":").map((x) => parseInt(x, 10));
      const d = new Date(selectedDay);
      d.setHours(hh, mm, 0, 0);
      startAtISO = toISOWithLocalOffset(d);
    }

    const newGame = {
      id: Date.now(),

      sport: sport,
      city: selectedVenue?.city || null,

      // Venue (field) from DB
      venue: selectedVenue
        ? {
            id: selectedVenue.id,
            name: selectedVenue.name,
            city: selectedVenue.city,
            lat: selectedVenue.lat,
            lng: selectedVenue.lng,
            hours: selectedVenue.hours,
            pricePerHour: selectedVenue.pricePerHour,
            currency: selectedVenue.currency,
          }
        : null,

      // Display card
      title: `${hostName}'s ${sport} game`,
      backgroundImage: selectedVenue?.image || null,

      // Skill + opponents
      level: levels,
      maxOpponents,

      // Scheduling
      flexible: isFlexible,
      courtBooked,
      timeMode: isFlexible ? "flexible" : timeMode,
      day: isFlexible ? null : selectedDay?.toDateString(),
      ranges: isFlexible ? ["any"] : timeMode === "range" ? selectedRanges : [],
      exactTime: isFlexible ? null : timeMode === "exact" || courtBooked ? selectedTimeSlot : null,
      durationMinutes:
        isFlexible ? null : (timeMode === "exact" || courtBooked) ? durationMinutes : null,
      startAt: startAtISO, // can be null when flexible/range

      // Trust
      verifiedOnly,

      // Host & players
      host: {
        id: loggedUser.id,
        name: hostName,
        profilePhoto: loggedUser?.profileInfo?.profilePhoto || loggedUser?.profilePhoto,
        verified: Boolean(loggedUser?.verified),
      },
      players: [
        {
          id: loggedUser.id,
          name: hostName,
          profilePhoto: loggedUser?.profileInfo?.profilePhoto || loggedUser?.profilePhoto,
        },
      ],
      pendingRequests: [],

      // Invites + notes
      invitedIds,
      notes: notes.trim(),

      // Status
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addGame(newGame);
    navigation.navigate("MyGames");
  };

  // -------- UI helpers --------
  const StepHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => (step === 1 ? navigation.goBack() : setStep(step - 1))}>
        <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Set up a match</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );

  const Progress = () => (
    <View style={styles.progressRow}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[styles.progressBar, step >= i && styles.progressBarActive]} />
      ))}
    </View>
  );

  const BottomNext = ({ label, disabled, onPress }) => (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.nextBtn, disabled && styles.nextBtnDisabled]}
      >
        <Text style={[styles.nextText, disabled && styles.nextTextDisabled]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );

  // =========================
  // STEP 1 UI
  // =========================
  const Step1 = () => (
    <View style={styles.page}>
      <Text style={styles.sectionTitle}>Select a sport</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {SPORTS.map((s) => {
          const active = sport === s.key;
          return (
            <TouchableOpacity
              key={s.key}
              onPress={() => setSport(prev => (prev === s.key ? null : s.key))}
              style={[styles.choiceCard, active && styles.choiceCardActive]}
            >
              <Ionicons
                name={s.icon}
                size={22}
                color={active ? theme.colors.primary : theme.colors.text}
              />
              <Text style={[styles.choiceLabel, active && styles.choiceLabelActive]} numberOfLines={1}>
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.subLabel}>Location</Text>
      <View style={styles.searchWrapper}>
      <TextInput
  placeholder="Search a venue"
  placeholderTextColor="#888"
  value={locationQuery}
  onChangeText={setLocationQuery}
  onFocus={() => setShowVenueList(true)}
  style={styles.searchInput}
/>

{showVenueList && (
  <View style={styles.dropdownWrapper}>
    <ScrollView keyboardShouldPersistTaps="handled">
      {filteredVenues.map((v) => {
        const active = venueId === v.id;
        return (
          <TouchableOpacity
            key={v.id}
            onPress={() => {
              setVenueId(v.id);
              setLocationQuery(v.name); // show selected value
              setShowVenueList(false);
            }}
            style={[
              styles.dropdownOption,
              active && styles.dropdownOptionActive,
            ]}
          >
            <Text style={styles.dropdownOptionText}>{v.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
)}
</View>

  
      {selectedVenue && (
        <View style={styles.venueCardWrap}>
          <TouchableOpacity activeOpacity={0.85} onPress={openMaps} style={styles.venueImageWrap}>
            <Image source={selectedVenue.image} style={styles.venueImage} />
            <View style={styles.venueNameOverlay}>
              <Text style={styles.venueName} numberOfLines={1}>
                {selectedVenue.name}
              </Text>
              <Text style={styles.venueCity} numberOfLines={1}>
                {selectedVenue.city}
              </Text>
              <Text style={styles.venueCity}>{selectedVenue.address}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.venueMetaRow}>
            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>Hours</Text>
              <Text style={styles.venueMetaValue}>{selectedVenue.hours}</Text>
            </View>

            <View style={styles.venueMetaBox}>
              <Text style={styles.venueMetaLabel}>Price / hour</Text>
              <Text style={styles.venueMetaValue}>
                {formatMoney(selectedVenue.pricePerHour, selectedVenue.currency)}
              </Text>
            </View>
          </View>

          <Text style={styles.disclaimer}>{priceDisclaimer}</Text>
        </View>
      )}

      <BottomNext
        label="Next"
        disabled={!canGoStep2}
        onPress={() => setStep(2)}
      />
    </View>
  );

  // =========================
  // STEP 2 UI
  // =========================
  const Step2 = () => (
    <View style={styles.page}>
      <Text style={styles.sectionTitle}>Match level</Text>

      <View style={styles.gridRow}>
        {LEVELS.map((lvl) => {
          const active = levels.includes(lvl);
          const showYour = defaultLevel && (Array.isArray(defaultLevel) ? defaultLevel.includes(lvl) : defaultLevel === lvl);
          return (
            <TouchableOpacity
              key={lvl}
              onPress={() => toggleLevel(lvl)}
              style={[styles.levelCard, active && styles.levelCardActive]}
            >
              {showYour && (
                <View style={styles.yourLevelTag}>
                  <Text style={styles.yourLevelText}>Your level</Text>
                </View>
              )}
              <Text style={[styles.levelCardText, active && styles.levelCardTextActive]}>
                {lvl}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Maximum number of opponents</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {Array.from({ length: 29 }, (_, i) => i + 2).map((n) => {
          const active = maxOpponents === n;
          return (
            <TouchableOpacity
              key={n}
              onPress={() => setMaxOpponents(n)}
              style={[styles.numBox, active && styles.numBoxActive]}
            >
              <Text style={[styles.numText, active && styles.numTextActive]}>{n}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Verified only + Court booked */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Verified users only</Text>
        <Switch
          value={verifiedOnly}
          onValueChange={setVerifiedOnly}
          trackColor={{ false: "#ccc", true: theme.colors.primary }}
          thumbColor={Platform.OS === "android" ? "#fff" : undefined}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Court booked</Text>
        <Switch
          value={courtBooked}
          onValueChange={setCourtBooked}
          trackColor={{ false: "#ccc", true: theme.colors.primary }}
          thumbColor={Platform.OS === "android" ? "#fff" : undefined}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 6 }]}>When</Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>I'm flexible</Text>
        <Switch
          value={isFlexible}
          onValueChange={setIsFlexible}
          trackColor={{ false: "#ccc", true: theme.colors.primary }}
          thumbColor={Platform.OS === "android" ? "#fff" : undefined}
        />
      </View>

      {/* Day selector */}
      <Text style={[styles.subLabel, { marginTop: 10 }]}>
        {isFlexible ? "Days" : "Pick a day"}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {dayOptions.map((d) => {
          const active = sameDay(selectedDay, d);
          const label =
            d.toDateString() === new Date().toDateString()
              ? "Today"
              : new Date(d.getTime() - 24 * 60 * 60 * 1000).toDateString() === new Date().toDateString()
              ? "Tomorrow"
              : d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

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
              <Text
                style={[
                  styles.dayPillText,
                  active && styles.dayPillTextActive,
                  isFlexible && styles.disabledText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Time mode */}
      <Text style={styles.subLabel}>Time</Text>
      <View style={styles.timeModeRow}>
        <TouchableOpacity
          disabled={isFlexible || courtBooked}
          onPress={() => setTimeMode("exact")}
          style={[
            styles.timeModeBtn,
            (timeMode === "exact" || courtBooked) && styles.timeModeBtnActive,
            (isFlexible || courtBooked) && styles.disabledPill,
          ]}
        >
          <Text
            style={[
              styles.timeModeText,
              (timeMode === "exact" || courtBooked) && styles.timeModeTextActive,
              (isFlexible || courtBooked) && styles.disabledText,
            ]}
          >
            Exact hours
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isFlexible}
          onPress={() => setTimeMode("range")}
          style={[
            styles.timeModeBtn,
            timeMode === "range" && !courtBooked && styles.timeModeBtnActive,
            isFlexible && styles.disabledPill,
          ]}
        >
          <Text
            style={[
              styles.timeModeText,
              timeMode === "range" && !courtBooked && styles.timeModeTextActive,
              isFlexible && styles.disabledText,
            ]}
          >
            Time ranges
          </Text>
        </TouchableOpacity>
      </View>

      {/* If court booked => exact required */}
      {!isFlexible && (timeMode === "exact" || courtBooked) ? (
        <>
          <Text style={styles.subLabel}>Starting time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {TIME_SLOTS.map((t) => {
              const active = selectedTimeSlot === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedTimeSlot(t)}
                  style={[styles.timeSlot, active && styles.timeSlotActive]}
                >
                  <Text style={[styles.timeSlotText, active && styles.timeSlotTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.subLabel}>Duration</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {DURATIONS.map((d) => {
              const active = durationMinutes === d.key;
              return (
                <TouchableOpacity
                  key={d.key}
                  onPress={() => setDurationMinutes(d.key)}
                  style={[styles.pill, active && styles.pillActive]}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>{d.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <>
          <Text style={styles.subLabel}>Select up to 2 ranges</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {TIME_RANGES.map((r) => {
              const active = selectedRanges.includes(r.key);
              return (
                <TouchableOpacity
                  key={r.key}
                  disabled={isFlexible}
                  onPress={() => toggleRange(r.key)}
                  style={[styles.rangeCard, active && styles.rangeCardActive, isFlexible && styles.disabledPill]}
                >
                  <Text style={[styles.rangeTitle, active && styles.rangeTitleActive, isFlexible && styles.disabledText]}>
                    {r.label}
                  </Text>
                  <Text style={[styles.rangeSub, active && styles.rangeSubActive, isFlexible && styles.disabledText]}>
                    {r.range}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}

      <BottomNext
        label="Next"
        disabled={!(canGoStep2 && canGoStep3 && scheduleOk)}
        onPress={() => setStep(3)}
      />
    </View>
  );

  // =========================
  // STEP 3 UI
  // =========================
  const Step3 = () => (
    <View style={styles.page}>
      <Text style={styles.sectionTitle}>Invite friends</Text>

      <TouchableOpacity
        style={styles.inviteBtn}
        onPress={() => setInviteModal(true)}
      >
        <Ionicons name="person-add-outline" size={18} color={theme.colors.text} />
        <Text style={styles.inviteBtnText}>
          Invite from friends list {invitedIds.length ? `(${invitedIds.length})` : ""}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes (optional)..."
        placeholderTextColor="#999"
        multiline
        style={styles.notes}
      />

      <BottomNext
        label="Create game"
        disabled={!canCreate}
        onPress={handleCreate}
      />

      {/* Invite modal */}
      <Modal transparent visible={inviteModal} animationType="fade" onRequestClose={() => setInviteModal(false)}>
        <TouchableWithoutFeedback onPress={() => setInviteModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select friends</Text>
                  <TouchableOpacity onPress={() => setInviteModal(false)}>
                    <Ionicons name="close" size={22} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>

                <ScrollView>
                  {friends.length === 0 ? (
                    <Text style={styles.emptyFriends}>No friends found yet.</Text>
                  ) : (
                    friends.map((f) => {
                      const active = invitedIds.includes(f.id);
                      return (
                        <TouchableOpacity
                          key={f.id}
                          onPress={() => toggleInvite(f.id)}
                          style={[styles.friendRow, active && styles.friendRowActive]}
                        >
                          <View style={styles.friendLeft}>
                            <View style={styles.friendAvatar}>
                              <Ionicons name="person" size={16} color="#666" />
                            </View>
                            <Text style={styles.friendName}>{f.name}</Text>
                          </View>
                          <Ionicons
                            name={active ? "checkmark-circle" : "ellipse-outline"}
                            size={20}
                            color={active ? theme.colors.primary : "#999"}
                          />
                        </TouchableOpacity>
                      );
                    })
                  )}
                </ScrollView>

                <TouchableOpacity style={styles.modalDone} onPress={() => setInviteModal(false)}>
                  <Text style={styles.modalDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <StepHeader />
      <Progress />

      <ScrollView contentContainerStyle={styles.scrollInner} keyboardShouldPersistTaps="handled">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollInner: { paddingBottom: 30 },

    header: {
      paddingTop: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 16,
      fontWeight: "600",
    },

    progressRow: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    progressBar: {
      flex: 1,
      height: 3,
      backgroundColor: "#ddd",
      borderRadius: 6,
    },
    progressBarActive: {
      backgroundColor: theme.colors.text,
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
      marginBottom: 12,
    },
    subLabel: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 13,
      fontWeight: "600",
      opacity: 0.8,
      marginBottom: 10,
      marginTop: 6,
    },

    hScroll: {
      paddingRight: 16,
    },

    choiceCard: {
      width: 120,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 12,
      marginRight: 12,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "space-between",
      minHeight: 70,
    },
    choiceCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    choiceLabel: {
      marginTop: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
    },
    choiceLabelActive: {
      color: theme.colors.text,
    },
    searchInput: {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 14,
  backgroundColor: "#f5f5f5",
},

venueDropdown: {
  maxHeight: 220,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  backgroundColor: "#fff",
  marginTop: 6,
},
dropdownWrapper: {
  position: "absolute",
  top: 62,               // just under input
  left: 0,
  right: 0,
  zIndex: 9999,
  elevation: 10,
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  maxHeight: 220,
},

dropdownOption: {
  paddingVertical: 14,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

dropdownOptionActive: {
  backgroundColor: "#EAF3FF",
},

dropdownOptionText: {
  fontWeight: "700",
},
searchWrapper: {
  position: "relative",
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
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
      fontSize: 13,
    },
    pillTextActive: {
      color: theme.colors.text,
    },

    venueCardWrap: { marginTop: 14 },
    venueImageWrap: {
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: "#eee",
    },
    venueImage: {
      width: "100%",
      height: 190,
      resizeMode: "cover",
    },
    venueNameOverlay: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 10,
      backgroundColor: "rgba(0,0,0,0.35)",
      borderRadius: 10,
      padding: 10,
    },
    venueName: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
      fontFamily: theme.fonts.family,
    },
    venueCity: {
      color: "#fff",
      marginTop: 2,
      fontSize: 12,
      opacity: 0.9,
      fontFamily: theme.fonts.family,
    },

    venueMetaRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
    venueMetaBox: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#e4e4e4",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 12,
    },
    venueMetaLabel: {
      fontSize: 12,
      opacity: 0.7,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600",
    },
    venueMetaValue: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: "800",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    disclaimer: {
      marginTop: 10,
      fontSize: 12,
      opacity: 0.65,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },
    disclaimer2: {
      marginTop: 4,
      fontSize: 12,
      opacity: 0.65,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    gridRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    levelCard: {
      width: "31%",
      minHeight: 86,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    levelCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    levelCardText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      fontSize: 12,
      textAlign: "center",
    },
    levelCardTextActive: {
      color: theme.colors.text,
    },
    levelHint: {
      marginTop: 6,
      fontSize: 10,
      opacity: 0.55,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      textAlign: "center",
    },
    yourLevelTag: {
      position: "absolute",
      top: 6,
      right: 6,
      backgroundColor: "#1E293B",
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    yourLevelText: { color: "#fff", fontSize: 10, fontWeight: "700" },

    numBox: {
      width: 46,
      height: 46,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    numBoxActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    numText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
    },
    numTextActive: {},

    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    switchLabel: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "700",
      fontSize: 14,
    },

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
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "700",
      fontSize: 12,
    },
    dayPillTextActive: {},

    timeModeRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 6,
    },
    timeModeBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    timeModeBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    timeModeText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      fontSize: 12,
    },
    timeModeTextActive: {},

    rangeCard: {
      width: 150,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 12,
      backgroundColor: "#fff",
      marginRight: 10,
    },
    rangeCardActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    rangeTitle: {
      fontWeight: "900",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 13,
    },
    rangeTitleActive: {},
    rangeSub: {
      marginTop: 6,
      opacity: 0.7,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 12,
      fontWeight: "700",
    },
    rangeSubActive: {},

    timeSlot: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      marginRight: 10,
    },
    timeSlotActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    timeSlotText: {
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      color: theme.colors.text,
      fontSize: 12,
    },
    timeSlotTextActive: {},

    disabledPill: {
      opacity: 0.45,
    },
    disabledText: {
      opacity: 0.6,
    },

    inviteBtn: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      padding: 14,
      borderRadius: 12,
    },
    inviteBtnText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      fontSize: 13,
    },

    notes: {
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 14,
      minHeight: 120,
      marginTop: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      textAlignVertical: "top",
    },

    bottomBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: "#eee",
    },
    nextBtn: {
      backgroundColor: "#2EA4FF",
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    nextBtnDisabled: {
      backgroundColor: "#BFDFFF",
    },
    nextText: {
      color: "#fff",
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 16,
    },
    nextTextDisabled: {
      color: "#f7fbff",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
      padding: 16,
    },
    modalBox: {
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      padding: 14,
      maxHeight: "75%",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    modalTitle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 15,
    },
    emptyFriends: {
      paddingVertical: 22,
      textAlign: "center",
      color: theme.colors.text,
      opacity: 0.7,
      fontFamily: theme.fonts.family,
      fontWeight: "700",
    },
    friendRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#eee",
      backgroundColor: "#fff",
      marginBottom: 10,
    },
    friendRowActive: {
      borderColor: theme.colors.primary,
      backgroundColor: "#EAF3FF",
    },
    friendLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    friendAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "#eee",
      alignItems: "center",
      justifyContent: "center",
    },
    friendName: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 13,
    },
    modalDone: {
      marginTop: 6,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    modalDoneText: {
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 14,
    },
  });
