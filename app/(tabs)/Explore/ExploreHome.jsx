import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import ExploreTopSection from "./ExploreTopSection";
import ExploreBottomSection from "./ExploreBottomSection";

const ExploreHome = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* RED SECTION */}
      <ExploreTopSection navigation={navigation} />

      {/* BLUE SECTION */}
      <ExploreBottomSection navigation={navigation} />
    </View>
  );
};

export default ExploreHome;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },
});
