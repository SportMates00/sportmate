import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { users_list } from "@/src/js files/users";
import { setUserInfo } from "@/src/store/userSlice";
import { useTranslation } from "react-i18next";
import StepBar from "./StepBar";

const QSchedule = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigation = useNavigation();

  // ------------------------------------------------------------
  // FIXED VERSION: universal keys + translated labels
  // ------------------------------------------------------------

  const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeKeys = ["Mor", "Aft", "Eve"];

  const dayLabels = dayKeys.map((key) => ({ key, label: t(key) }));
  const timeLabels = timeKeys.map((key) => ({ key, label: t(key) }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerStyle: { borderBottomWidth: 1, borderColor: "white" },
    });
  }, [navigation]);

  // Availability is stored using universal KEYS only
  const [availability, setAvailability] = useState(
    dayKeys.reduce((acc, day) => {
      acc[day] = timeKeys.reduce((timeAcc, time) => {
        timeAcc[time] = false;
        return timeAcc;
      }, {});
      return acc;
    }, {})
  );

  function handleClientInfoCompletion() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      })
    );
  }

  const toggleCell = (dayKey, timeKey) => {
    const updatedAvailability = {
      ...availability,
      [dayKey]: {
        ...availability[dayKey],
        [timeKey]: !availability[dayKey][timeKey],
      },
    };

    setAvailability(updatedAvailability);

    dispatch(
      setUserInfo({
        ...userInfo,
        profileInfo: {
          ...userInfo.profileInfo,
          availability: updatedAvailability, // STORES KEYS, NOT LABELS
        },
      })
    );
  };

  const isAtLeastOneSelected = () => {
    return Object.values(availability).some((day) =>
      Object.values(day).some((time) => time)
    );
  };

  const handleGetStarted = () => {
    if (!isAtLeastOneSelected()) {
      Alert.alert(t("Error"), t("oneSlot"));
      return;
    }

    try {
      users_list.push(userInfo);
      dispatch(setUserInfo(userInfo));
      handleClientInfoCompletion();
      console.log("USER INFO NEW I", userInfo);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StepBar step={3} />

      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>{t("Availability")}</Text>
        <Text style={{ fontSize: 14, marginBottom: 60 }}>
          {t("selectBoxes")}
        </Text>

        <View style={styles.table}>
          {/* Header row */}
          <View style={styles.row}>
            <View style={[styles.headerCell, { flex: 1 }]} />
            {dayLabels.map((d, index) => (
              <View
                key={d.key}
                style={[
                  styles.headerCell,
                  index === dayKeys.length - 1 && { borderRightWidth: 0 },
                ]}
              >
                <Text style={styles.headerText}>{d.label}</Text>
              </View>
            ))}
          </View>

          {/* Body rows */}
          {timeLabels.map((time) => (
            <View key={time.key} style={styles.row}>
              <View style={[styles.headerCell, { borderRightWidth: 1 }]}>
                <Text style={styles.headerText}>{time.label}</Text>
              </View>

              {dayKeys.map((dayKey, colIndex) => (
                <TouchableOpacity
                  key={`${time.key}-${dayKey}`}
                  style={[
                    styles.cell,
                    availability[dayKey][time.key] && styles.selectedCell,
                    colIndex === dayKeys.length - 1 && { borderRightWidth: 0 },
                  ]}
                  onPress={() => toggleCell(dayKey, time.key)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>{t("getStarted")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    alignItems:'center'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },

  // Container for header cells (days + times)
  headerCell: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  cell: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  selectedCell: {
    backgroundColor: '#4CAF50',
  },

  button: {
    marginTop: 46,
    width: "70%",
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QSchedule;
