import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { ExploreContext } from "./ExploreContext";

const ExploreVenueDetails = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { saved, toggleSaved } = useContext(ExploreContext);

  const venueId = route?.params?.venueId || "hrazdan";
  const isHrazdan = venueId === "hrazdan";

  // ✅ Static details (for now)
  const title = isHrazdan ? "Hrazdan Stadium" : "Dinamo Indoor Court";
  const sub = isHrazdan
    ? "Kentron • Football • Outdoor"
    : "Arabkir • Basketball • Indoor";

  const imageUri = isHrazdan
    ? "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1400&q=60"
    : "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=60";

  const about = isHrazdan
    ? "Iconic Yerevan stadium with a strong atmosphere. Best to arrive early for parking."
    : "Indoor court with consistent lighting. Booking is usually needed on weekends.";

  const tags = isHrazdan
    ? ["Lights", "Paid", "Parking"]
    : ["Indoor", "Lights", "Paid"];

  const isSaved = !!saved?.[venueId];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* HERO */}
        <ImageBackground source={{ uri: imageUri }} style={styles.hero} imageStyle={styles.heroImg}>
          <View style={styles.heroTopRow}>
            <TouchableOpacity
              style={[styles.heroIcon, { borderColor: "rgba(255,255,255,0.5)" }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Ionicons name="arrow-back" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.heroIcon, { borderColor: "rgba(255,255,255,0.5)" }]}
              onPress={() => toggleSaved(venueId)}
              activeOpacity={0.85}
            >
              <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroOverlay}>
            <Text style={[styles.heroTitle, { fontFamily: theme.fonts.family }]}>{title}</Text>
            <Text style={[styles.heroSub, { fontFamily: theme.fonts.family }]}>{sub}</Text>
          </View>
        </ImageBackground>

        {/* TAGS */}
        <View style={styles.tagsRow}>
          {tags.map((x) => (
            <Text
              key={x}
              style={[
                styles.tag,
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.text,
                  fontFamily: theme.fonts.family,
                },
              ]}
            >
              {x}
            </Text>
          ))}
        </View>

        {/* ABOUT */}
        <View style={[styles.sectionCard, { borderColor: theme.colors.text }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            Venue info
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {about}
          </Text>
        </View>

        {/* QUICK INFO */}
        <View style={[styles.sectionCard, { borderColor: theme.colors.text }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            Quick info
          </Text>

          <View style={styles.rowLine}>
            <Ionicons name="location-outline" size={16} color={theme.colors.text} />
            <Text style={[styles.rowText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
              {isHrazdan ? "Yerevan, Kentron" : "Yerevan, Arabkir"}
            </Text>
          </View>

          <View style={styles.rowLine}>
            <Ionicons name="time-outline" size={16} color={theme.colors.text} />
            <Text style={[styles.rowText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
              {isHrazdan ? "Open: 09:00 – 23:00" : "Open: 10:00 – 22:00"}
            </Text>
          </View>

          <View style={styles.rowLine}>
            <Ionicons name="cash-outline" size={16} color={theme.colors.text} />
            <Text style={[styles.rowText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
              {isHrazdan ? "Price: paid booking" : "Price: paid booking"}
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]} activeOpacity={0.9}>
            <Text style={[styles.primaryBtnText, { color: theme.colors.buttonText, fontFamily: theme.fonts.family }]}>
              Create game here
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: theme.colors.text }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ExploreMap", { venueId })}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
              View on map
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreVenueDetails;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },

  hero: { height: 220, borderRadius: 18, overflow: "hidden" },
  heroImg: { borderRadius: 18 },

  heroTopRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroTitle: { color: "#fff", fontSize: 18 },
  heroSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 4 },

  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12, marginBottom: 6 },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    marginRight: 8,
    marginBottom: 8,
  },

  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  sectionTitle: { fontSize: 14, marginBottom: 8 },
  sectionText: { fontSize: 12, opacity: 0.8, lineHeight: 16 },

  rowLine: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  rowText: { fontSize: 12, opacity: 0.85 },

  actionsRow: { flexDirection: "row", marginTop: 12, gap: 10 },
  primaryBtn: { flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: "center" },
  primaryBtnText: { fontSize: 12 },
  secondaryBtn: { flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: "center", borderWidth: 1 },
  secondaryBtnText: { fontSize: 12 },
});
