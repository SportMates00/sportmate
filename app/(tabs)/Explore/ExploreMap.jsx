import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";

const ExploreMap = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
          {t("Map")}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.center}>
        <Ionicons name="map-outline" size={26} color={theme.colors.text} />
        <Text style={[styles.text, { color: theme.colors.text, fontFamily: theme.fonts.family }]}>
          {t("MapComingSoon")}
        </Text>
      </View>
    </View>
  );
};

export default ExploreMap;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 16 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  text: { fontSize: 12, opacity: 0.75 },
});
