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

const ExploreSaved = ({ navigation }) => {
  const { theme } = useTheme();
  const { saved, toggleSaved } = useContext(ExploreContext);

  const hasAny = saved?.hrazdan || saved?.dinamo;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* HEADER */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
          Saved venues
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {!hasAny && (
          <View style={[styles.emptyBox, { borderColor: theme.colors.text }]}>
            <Ionicons name="bookmark-outline" size={18} color={theme.colors.text} />
            <Text style={[styles.emptyText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
              No saved venues yet. Tap the bookmark on a venue card.
            </Text>
          </View>
        )}

        {/* ✅ HRZDAN */}
        {saved?.hrazdan && (
          <View style={[styles.card, { borderColor: theme.colors.text }]}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=60",
              }}
              style={styles.photo}
              imageStyle={styles.photoImg}
            >
              {/* UNSAVE */}
              <TouchableOpacity
                style={[styles.saveBtn, { borderColor: "rgba(255,255,255,0.6)" }]}
                onPress={() => toggleSaved("hrazdan")}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark" size={18} color="#fff" />
              </TouchableOpacity>

              <View style={styles.photoOverlay}>
                <View style={styles.photoRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.photoTitle, { fontFamily: theme.fonts.family }]}>
                      Hrazdan Stadium
                    </Text>
                    <Text style={[styles.photoSub, { fontFamily: theme.fonts.family }]}>
                      Kentron • Football • Outdoor
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#fff" />
                </View>
              </View>
            </ImageBackground>

            <View style={styles.tagsRow}>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Lights
              </Text>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Paid
              </Text>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Parking
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Venue info
              </Text>
              <Text style={[styles.infoText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Iconic Yerevan stadium. Best to arrive early for parking.
              </Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.primaryBtnText, { color: theme.colors.buttonText, fontFamily: theme.fonts.family }]}>
                  Create game here
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: theme.colors.text }]}>
                <Text style={[styles.secondaryBtnText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                  Upcoming games
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ✅ DINAMO */}
        {saved?.dinamo && (
          <View style={[styles.card, { borderColor: theme.colors.text }]}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=60",
              }}
              style={styles.photo}
              imageStyle={styles.photoImg}
            >
              {/* UNSAVE */}
              <TouchableOpacity
                style={[styles.saveBtn, { borderColor: "rgba(255,255,255,0.6)" }]}
                onPress={() => toggleSaved("dinamo")}
                activeOpacity={0.85}
              >
                <Ionicons name="bookmark" size={18} color="#fff" />
              </TouchableOpacity>

              <View style={styles.photoOverlay}>
                <View style={styles.photoRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.photoTitle, { fontFamily: theme.fonts.family }]}>
                      Dinamo Indoor Court
                    </Text>
                    <Text style={[styles.photoSub, { fontFamily: theme.fonts.family }]}>
                      Arabkir • Basketball • Indoor
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#fff" />
                </View>
              </View>
            </ImageBackground>

            <View style={styles.tagsRow}>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Indoor
              </Text>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Lights
              </Text>
              <Text style={[styles.tag, { color: theme.colors.text, borderColor: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Paid
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Venue info
              </Text>
              <Text style={[styles.infoText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                Indoor court with consistent lighting. Booking usually required on weekends.
              </Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.primaryBtnText, { color: theme.colors.buttonText, fontFamily: theme.fonts.family }]}>
                  Create game here
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: theme.colors.text }]}>
                <Text style={[styles.secondaryBtnText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
                  Upcoming games
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ExploreSaved;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 16 },

  emptyBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  emptyText: { fontSize: 12, opacity: 0.8, lineHeight: 16, flex: 1 },

  card: { borderWidth: 1, borderRadius: 16, padding: 12, marginBottom: 12 },

  photo: { height: 130, borderRadius: 14, overflow: "hidden" },
  photoImg: { borderRadius: 14 },

  saveBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  photoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  photoRow: { flexDirection: "row", alignItems: "center" },
  photoTitle: { color: "#fff", fontSize: 16 },
  photoSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 },

  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    marginRight: 8,
    marginBottom: 8,
  },

  infoBox: { marginTop: 6 },
  infoTitle: { fontSize: 13, opacity: 0.9, marginBottom: 4 },
  infoText: { fontSize: 12, opacity: 0.75, lineHeight: 16 },

  actionsRow: { flexDirection: "row", marginTop: 12 },
  primaryBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 10,
  },
  primaryBtnText: { fontSize: 12 },

  secondaryBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryBtnText: { fontSize: 12 },
});
