import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";

const ExploreTopSection = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Explore")}
          </Text>
          <Text style={[styles.subTitle, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("ExploreSubtitle")}
          </Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={[styles.iconBtn, { borderColor: theme.colors.text }]}
            onPress={() => navigation.navigate("ExploreSaved")}
          >
            <Ionicons name="bookmark-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, { borderColor: theme.colors.text }]}
            onPress={() => navigation.navigate("ExploreMap")}
          >
            <Ionicons name="map-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.searchRow, { borderColor: theme.colors.text }]}>
        <Ionicons name="search" size={18} color={theme.colors.text} />
        <TextInput
          placeholder={t("SearchVenuesDistricts")}
          placeholderTextColor={theme.colors.text}
          style={[styles.searchInput, { color: theme.colors.text, fontFamily: theme.fonts.family }]}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        <TouchableOpacity style={[styles.chipActive, { backgroundColor: theme.colors.primary }]}>
          <Ionicons name="apps-outline" size={16} color={theme.colors.buttonText} />
          <Text style={[styles.chipTextActive, { color: theme.colors.buttonText, fontFamily: theme.fonts.family }]}>
            {t("All")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, { borderColor: theme.colors.text }]}>
          <Ionicons name="football-outline" size={16} color={theme.colors.text} />
          <Text style={[styles.chipText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Football")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, { borderColor: theme.colors.text }]}>
          <Ionicons name="basketball-outline" size={16} color={theme.colors.text} />
          <Text style={[styles.chipText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Basketball")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, { borderColor: theme.colors.text }]}>
          <Ionicons name="tennisball-outline" size={16} color={theme.colors.text} />
          <Text style={[styles.chipText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Tennis")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, { borderColor: theme.colors.text }]}>
          <Ionicons name="home-outline" size={16} color={theme.colors.text} />
          <Text style={[styles.chipText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Indoor")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.chip, { borderColor: theme.colors.text }]}>
          <Ionicons name="flash-outline" size={16} color={theme.colors.text} />
          <Text style={[styles.chipText, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
            {t("Lights")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ExploreTopSection;

// keep your existing styles...
const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerIcons: { flexDirection: "row", gap: 10 },
  title: { fontSize: 20 },
  subTitle: { fontSize: 12, opacity: 0.75, marginTop: 2 },
  iconBtn: { width: 38, height: 38, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  searchRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  searchInput: { flex: 1, fontSize: 13, marginLeft: 10 },
  chipsRow: { marginBottom: 10 },
  chipActive: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, marginRight: 8 },
  chip: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, borderWidth: 1, marginRight: 8 },
  chipText: { fontSize: 12, marginLeft: 6 },
  chipTextActive: { fontSize: 12, marginLeft: 6 },
});
