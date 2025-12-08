import React from "react";
import { View, StyleSheet } from "react-native";

const StepBar = ({ step }) => {
  const totalSteps = 3;

  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.line,
            { backgroundColor: step >= i ? "#4CAF50" : "#D8D8D8" }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 4,
    borderRadius: 10,
    marginHorizontal: 3,
  },
});

export default StepBar;
