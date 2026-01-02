import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const GameDetailsButtons = ({ game, loggedUser, tab, invitePlayers}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userId = loggedUser;

  /* ---------- ROLE FLAGS ---------- */
  const isHost = game?.host?.id === userId;
  const isPlayer = !!game?.players?.some(p => p.id === userId);
  const isPending = !!game?.pendingRequests?.some(p => p.id === userId);
  const isInvited = !!game?.invitedPlayers?.some(p => p.id === userId);

  /* ---------- CHAT PERMISSION ---------- */
  const canChat = isHost || isPlayer;

  /* ---------- VERIFICATION ---------- */
  const requiresVerification =
    game?.verifiedOnly && !loggedUser?.userVerification;

  // ⚠️ INVITED USERS ARE ALWAYS ALLOWED TO JOIN (even if unverified)
  const verificationBlocksJoin = requiresVerification && !isInvited;

  /* ---------- ACTION GUARDS ---------- */

  const handleChat = () => {
    if (!canChat) {
      Alert.alert(
        t("JoinRequired") || "Join required",
        t("YouNeedToJoinToChat") ||
          "You need to join the event first to be able to chat."
      );
      return;
    }

    navigation.navigate("ChatScreen", { gameId: game.id });
  };

  const handleAskToJoin = () => {
    if (verificationBlocksJoin) {
      Alert.alert(
        t("VerificationRequired") || "Verification required",
        t("VerifiedOnlyEvent") ||
          "This event is only available to verified users."
      );
      return;
    }

    // TODO — dispatch: send join request
    Alert.alert(t("RequestSent") || "Request sent");
  };

  const handleJoinInvite = () => {
    // NOTE: invited users DO NOT require verification
    // TODO — dispatch: accept invite
    Alert.alert(t("Joined") || "Joined");
  };

  /* ---------- PAST GAMES → HIDE FOOTER ---------- */
  if (tab === "past") return null;

  /* ---------- PUBLIC MODE ---------- */
  if (tab === "public") {
    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
          <Text style={styles.chatText}>{t("GameDetailsChat")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.joinBtn} onPress={handleAskToJoin}>
          <Text style={styles.joinText}>{t("AskToJoin")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------- CURRENT MODE ---------- */
  return (
    <View style={styles.bottomBar}>
      {/* CHAT BUTTON (always shown in current mode) */}
      <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
        <Text style={styles.chatText}>{t("GameDetailsChat")}</Text>
      </TouchableOpacity>

      {/* RIGHT BUTTON LOGIC */}
      {isHost ? (
        <TouchableOpacity style={styles.joinBtn} onPress={invitePlayers}>
          <Text style={styles.joinText}>{t("InvitePlayers")}</Text>
        </TouchableOpacity>
      ) : isPlayer ? (
        <TouchableOpacity style={[styles.joinBtn, styles.disabled]} disabled>
          <Text style={styles.joinText}>{t("Joined")}</Text>
        </TouchableOpacity>
      ) : isPending ? (
        <TouchableOpacity style={[styles.joinBtn, styles.disabled]} disabled>
          <Text style={styles.joinText}>{t("Pending")}</Text>
        </TouchableOpacity>
      ) : isInvited ? (
        <TouchableOpacity style={styles.joinBtn} onPress={handleJoinInvite}>
          <Text style={styles.joinText}>{t("Join")}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.joinBtn} onPress={handleAskToJoin}>
          <Text style={styles.joinText}>{t("AskToJoin")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/* ---------- STYLES ---------- */
const getStyles = theme =>
  StyleSheet.create({
    bottomBar: {
      flexDirection: "row",
      padding: 25,
      gap: 10,
      backgroundColor: theme.colors.background
    },
    chatBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.text
    },
    chatText: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "600"
    },
    joinBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: theme.colors.primary
    },
    joinText: {
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
      fontWeight: "700"
    },
    disabled: {
      opacity: 0.5
    }
  });

export default GameDetailsButtons;
