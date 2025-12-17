import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/src/theme/themeContext";

const CreateGame = ({ loggedUser, addGame }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // BASIC FORM STATE
  const [sport, setSport] = useState("");
  const [gameType, setGameType] = useState("Practice");
  const [level, setLevel] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("10");

  const handleCreate = () => {
    if (!sport || !date || !time) return;

    const newGame = {
      id: Date.now(),
      sport,
      title: `${loggedUser.profileInfo.firstName}'s ${sport} game`,
      backgroundImage: null, // we’ll map this later by sport

      date,
      time,
      timezone: "GMT+4",

      gameType,
      level,
      maxPlayers: Number(maxPlayers),

      host: {
        id: loggedUser.id,
        name: loggedUser.profileInfo.firstName,
        verified: loggedUser.verified,
      },

      players: [
        {
          id: loggedUser.id,
          name: loggedUser.profileInfo.firstName,
        },
      ],

      pendingRequests: [],
      verifiedOnly: false,
      visibility: "public",
      chatEnabled: true,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    addGame(newGame);
    navigation.navigate("MyGames");
  };

  const Input = ({ label, value, onChange, keyboardType }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ marginBottom: 6 }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
      }}
    />
  </View>
  
);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Game</Text>

      <Input label="Sport" value={sport} onChange={setSport} />
      <Input label="Date" value={date} onChange={setDate} />
      <Input label="Time" value={time} onChange={setTime} />
      <Input
        label="Max Players"
        value={maxPlayers}
        onChange={setMaxPlayers}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.createText}>Create Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const getStyles = theme =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 20,
    },
    createBtn: {
      backgroundColor: "#2e89ff",
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
    },
    createText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
  });



export default CreateGame;
