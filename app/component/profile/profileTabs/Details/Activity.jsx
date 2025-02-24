import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import favicon from "@/assets/images/profilepicture.png";
import EventDetails from "./EventDetails";
import { useTheme } from "@/app/theme/themeContext";

const Activity = ({loggedUser}) => {
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  let completedEvents = loggedUser.profileInfo.completedEvents;
  return (
    <View style={styles.container}>
      {completedEvents.length === 0 ? (
        <Text style={styles.noEvents}>No events have been completed yet.</Text>
      ) : 
        completedEvents.map( item  => {
          return (
            (
            <View key={item.date} style={styles.card}>
              <View style={styles.topRow}>
                <FontAwesome5 name={item.sport === "Football" ? "futbol" : "table-tennis"} size={30} color={theme.colors.primary} style={styles.sportIcon} />
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <View style={styles.teamContainer}>
                <View style={styles.teamWrapper}>
                  {item.teamA.length <= 2 ? (
                    item.teamA.map((player, index) => (
                      <View key={index} style={styles.playerContainer}>
                        <Image source={ player.profilePhoto } style={styles.profilePhoto} />
                        <Text style={styles.playerName}>{player.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.teamName}>Team A</Text>
                  )}
                </View>
                <View style={styles.vsContainer}>
                  <Text style={styles.vsText}>vs</Text>
                </View>
                <View style={styles.teamWrapper}>
                  {item.teamB.length <= 2 ? (
                    item.teamB.map((player, index) => (
                      <View key={index} style={styles.playerContainer}>
                        <Image source={ player.profilePhoto} style={styles.profilePhoto} />
                        <Text style={styles.playerName}>{player.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.teamName}>Team B</Text>
                  )}
                </View>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.location}>📍 {item.location}</Text>
                <Text style={styles.cityRegion}> {item.city} {item.region}</Text>
              </View>
              <EventDetails event={item}/>
            </View>
        )
          )
        }
      )}
      
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  noEvents: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.semiCircle,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    elevation: 4,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.5,
    shadowRadius: theme.radius.semiCircle,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sportIcon: {
    marginLeft: theme.spacing.small,
  },
  date: {
    fontSize: theme.fonts.size.medium,
    fontStyle: "italic",
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: theme.spacing.medium,
  },
  teamWrapper: {
    width: "40%",
    alignItems: "center",
  },
  vsContainer: {
    width: "20%",
    alignItems: "center",
  },
  playerContainer: {
    alignItems: "center",
    marginVertical: theme.spacing.small,
  },
  profilePhoto: {
    width: 45,
    height: 45,
    borderRadius: theme.radius.circle,
  },
  playerName: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "500",
    textAlign: "center",
    marginTop: theme.spacing.small,
    color:theme.colors.text
  },
  teamName: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    color:theme.colors.text
  },
  vsText: {
    fontSize: theme.fonts.size.large,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing.small,
  },
  location: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "500",
  },
  cityRegion: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
  },
});

export default Activity;
