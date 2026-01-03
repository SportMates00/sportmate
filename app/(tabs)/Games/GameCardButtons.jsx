import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const GameCardButtons = ({ game, loggedUser, tab }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const userId = loggedUser?.id;

  const state = useMemo(() => {
    const isHost = game?.host?.id === userId;
    const isPlayer = !!game?.players?.some((p) => p.id === userId);
    const isPending = !!game?.pendingRequests?.some((p) => p.id === userId);
    const isInvited = !!game?.invitedPlayers?.some((p) => p.id === userId);
    const isRejected = !!game?.rejectedPlayers?.some((p) => p.id === userId);

    // CURRENT TAB
    if (tab === "current") {
      // If invited (current) -> Accept/Reject (ONLY)
      if (isInvited) return "INVITED_CURRENT";

      // If joined (player OR host) -> View Details + Joined (or Host)
      if (isHost) return "HOST_CURRENT";
      if (isPlayer) return "JOINED_CURRENT";

      // If requested and pending -> View Details + Pending
      if (isPending) return "PENDING_CURRENT";

      // Fallback (should rarely happen due to your myGames selector)
      return "VIEW_ONLY";
    }

    // PAST TAB
    if (tab === "past") {
      // If rejected -> View Reason + Rejected
      if (isRejected) return "REJECTED_PAST";

      // If invited but never accepted/rejected (moved to past automatically)
      // This means: invited exists, but user never became a player/host.
      if (isInvited && !isPlayer && !isHost) return "INVITE_EXPIRED_PAST";

      // If played (host or player) -> View Details + Played
      if (isHost) return "HOST_PAST";
      if (isPlayer) return "PLAYED_PAST";

      // Optional: if pending but event ended, you can treat it as expired.
      if (isPending) return "PENDING_EXPIRED_PAST";

      return "VIEW_ONLY";
    }

    return "VIEW_ONLY";
  }, [game, userId, tab]);

  const goDetails = () => {
    navigation.navigate("GameDetails", { gameId: game.id, tab });
  };



  const guardVerification = () => {
    if (game?.verifiedOnly && !loggedUser?.userVerification) {
      Alert.alert(
        t("VerificationRequired") || "Verification required",
        t("VerifiedOnlyEvent") || "This event is only available to verified users."
      );
      return false;
    }
    return true;
  };

  const acceptInvite = () => {
    if (!guardVerification()) return;

    // TODO: dispatch accept action
    Alert.alert(t("Accepted") || "Accepted", t("InviteAccepted") || "You accepted the invitation.");
  };

  const rejectInvite = () => {
    // TODO: dispatch reject action
    Alert.alert(t("Rejected") || "Rejected", t("InviteRejected") || "You rejected the invitation.");
  };

  // -------- RENDER MAP --------
  if (state === "INVITED_CURRENT") {
    return (
      <View style={styles.actions}>
        
        <TouchableOpacity style={[styles.primaryBtn, styles.rejectBtn]} onPress={rejectInvite}>
          <Text style={styles.primaryText}>{t("Reject")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            game?.verifiedOnly && !loggedUser?.userVerification && styles.disabledBtn,
          ]}
          onPress={acceptInvite}
        >
          <Text style={styles.primaryText}>{t("Accept")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "JOINED_CURRENT") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Joined")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "PENDING_CURRENT") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Pending")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "REJECTED_PAST") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>{t("ViewReason")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Rejected")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "PLAYED_PAST") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Played")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "INVITE_EXPIRED_PAST") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>
            {t("DidNotAcceptInvitation") || "Did not accept invitation"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "PENDING_EXPIRED_PAST") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>
            {t("RequestExpired") || "Request expired"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "HOST_CURRENT") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Host") || "Host"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (state === "HOST_PAST") {
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
          <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryBtn]} activeOpacity={1}>
          <Text style={styles.primaryText}>{t("Hosted") || "Hosted"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // VIEW_ONLY fallback
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.secondaryBtn} onPress={goDetails}>
        <Text style={styles.secondaryText}>{t("ViewDetails")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    actions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
    },
    secondaryBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    secondaryText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
    },
    primaryBtn: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
    },
    primaryText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
    },
    disabledBtn: {
      opacity: 0.55,
    },
    rejectBtn: {
      backgroundColor: "red",
    },
  });

export default GameCardButtons;
