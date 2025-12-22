import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";

import CreateGame1 from "./CreateGame1";
import CreateGame2 from "./CreateGame2";
import CreateGame3 from "./CreateGame3";

const CreateGameComponent = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const [step, setStep] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Set up a match",
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation, theme]);

  /* ---------- HANDLERS ---------- */
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    // Create logic will go here later
    console.log("Create game");
  };

  /* ---------- RENDER STEP ---------- */
  const renderStep = () => {
    if (step === 1) return <CreateGame1 step={step} setStep={setStep} />;
    if (step === 2) return <CreateGame2 step={step} setStep={setStep} />;
    if (step === 3) return <CreateGame3 step={step} setStep={setStep} />;
    return null;
  };

  return (
    <View style={styles.container}>
      {/* ---------- STEP INDICATOR ---------- */}
      <View style={styles.lineIndicator}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.line,
              { backgroundColor: step >= i ? theme.colors.primary : "#D8D8D8" },
            ]}
          />
        ))}
      </View>

      {/* ---------- PAGE CONTENT ---------- */}
      <View style={styles.content}>{renderStep()}</View>

      {/* ---------- GLOBAL BOTTOM BAR ---------- */}
      <View style={styles.bottomBar}>
        {step > 1 && (
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        {step < 3 && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        )}

        {step === 3 && (
          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CreateGameComponent;

/* ======================= STYLES ======================= */

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      flex: 1,
    },

    lineIndicator: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 10,
    },

    line: {
      flex: 1,
      height: 4,
      borderRadius: 10,
      marginHorizontal: 3,
    },

    bottomBar: {
      flexDirection: "row",
      gap: 12,
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      backgroundColor: theme.colors.background,
    },

    backBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#fff",
    },

    backText: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },

    nextBtn: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },

    nextText: {
      fontSize: 16,
      fontWeight: "900",
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
    },

    createBtn: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#22C55E",
    },

    createText: {
      fontSize: 16,
      fontWeight: "900",
      color: "#fff",
      fontFamily: theme.fonts.family,
    },
  });
