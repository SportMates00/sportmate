import React, { useState } from "react";
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

const QSchedule = () => {
  const { t } = useTranslation();
  const days = [t("Mon"), t("Tue"), t("Wed"), t("Thu"), t("Fri"), t("Sat"), t("Sun")];
  const times = [t("Mor"), t("Aft"), t("Eve")];

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigation = useNavigation();

  const [availability, setAvailability] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.reduce((timeAcc, time) => {
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

  const toggleCell = (day, time) => {
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [time]: !availability[day][time],
      },
    };

    setAvailability(updatedAvailability);

    dispatch(
      setUserInfo({
        ...userInfo,
        profileInfo: {
          ...userInfo.profileInfo,
          availability: updatedAvailability,
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
      <Text style={styles.heading}>{t("Availability")}</Text>

      <View style={styles.table}>
        {/* Header row */}
        <View style={styles.row}>
          <View style={[styles.headerCell, { flex: 1 }]} />
          {days.map((day, index) => (
            <View
              key={index}
              style={[
                styles.headerCell,
                index === days.length - 1 && { borderRightWidth: 0 },
              ]}
            >
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Body rows */}
        {times.map((time, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <View style={[styles.headerCell, { borderRightWidth: 1 }]}>
              <Text style={styles.headerText}>{time}</Text>
            </View>

            {days.map((day, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.cell,
                  availability[day][time] && styles.selectedCell,
                  colIndex === days.length - 1 && { borderRightWidth: 0 },
                ]}
                onPress={() => toggleCell(day, time)}
              />
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>{t("getStarted")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
