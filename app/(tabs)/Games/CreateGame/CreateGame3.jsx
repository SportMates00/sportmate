import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
// import BottomNext from "@/src/components/BottomNext";

const CreateGame3 = ({ step, setStep }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  // ✅ MODAL STATE
  const [inviteModal, setInviteModal] = useState(false);
  const [search, setSearch] = useState("");

  const friends = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Brown" },
  ];

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.page}>
      {/* TITLE */}
      <Text style={styles.sectionTitle}>
        {t("InviteFriends")}
      </Text>

      {/* INVITE BUTTON */}
      <TouchableOpacity
        style={styles.inviteBtn}
        onPress={() => setInviteModal(true)}
      >
        <Ionicons
          name="person-add-outline"
          size={18}
          color={theme.colors.buttonText}
        />
        <Text style={styles.inviteBtnText}>
          {t("InviteFromFriendsList")}
        </Text>
      </TouchableOpacity>

      {/* NOTES */}
      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
        {t("Notes")}
      </Text>

      <TextInput
        style={styles.notes}
        placeholder={t("AddNotesOptional")}
        placeholderTextColor="#999"
        multiline
      />

      {/* INVITE MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={inviteModal}
        onRequestClose={() => setInviteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("SelectFriends")}
              </Text>
              <TouchableOpacity onPress={() => setInviteModal(false)}>
                <Ionicons
                  name="close"
                  size={22}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View style={styles.searchWrapper}>
              <Ionicons
                name="search-outline"
                size={18}
                color="#999"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={t("SearchFriends")}
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* SECTION LABEL */}
            <Text style={styles.listTitle}>
              {t("MyFriends")}
            </Text>

            {/* FRIEND LIST */}
            <ScrollView>
              {filteredFriends.length === 0 ? (
                <Text style={styles.emptyFriends}>
                  {t("NoFriendsFound")}
                </Text>
              ) : (
                filteredFriends.map((f) => (
                  <TouchableOpacity
                    key={f.id}
                    style={styles.friendRow}
                  >
                    <View style={styles.friendLeft}>
                      <View style={styles.friendAvatar}>
                        <Ionicons
                          name="person"
                          size={16}
                          color="#666"
                        />
                      </View>
                      <Text style={styles.friendName}>
                        {f.name}
                      </Text>
                    </View>
                    <Ionicons
                      name="ellipse-outline"
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalDone}
              onPress={() => setInviteModal(false)}
            >
              <Text style={styles.modalDoneText}>
                {t("Done")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    page: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 90,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },

    inviteBtn: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.primary,
      padding: 14,
      borderRadius: 12,
    },

    inviteBtnText: {
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
      fontWeight: "800",
      fontSize: 13,
    },

    notes: {
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 14,
      minHeight: 120,
      marginTop: 10,
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      textAlignVertical: "top",
    },

    /* ---------- INVITE MODAL ---------- */

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
      padding: 16,
    },

    modalBox: {
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      padding: 14,
      height: "75%",
    },

    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    modalTitle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 15,
    },

    searchWrapper: {
      position: "relative",
      marginBottom: 12,
    },

    searchIcon: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: [{ translateY: -9 }],
      zIndex: 1,
    },

    searchInput: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      paddingVertical: 12,
      paddingLeft: 38,
      paddingRight: 12,
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.family,
      color: theme.colors.text,
    },

    listTitle: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.colors.text,
      marginBottom: 8,
      marginTop: 6,
      fontFamily: theme.fonts.family,
      opacity: 0.8,
    },

    emptyFriends: {
      paddingVertical: 22,
      textAlign: "center",
      color: theme.colors.text,
      opacity: 0.7,
      fontFamily: theme.fonts.family,
      fontWeight: "700",
    },

    friendRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#eee",
      backgroundColor: theme.colors.background,
      marginBottom: 10,
    },

    friendRowActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },

    friendLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    friendAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "#eee",
      alignItems: "center",
      justifyContent: "center",
    },

    friendName: {
      color: theme.colors.text,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 13,
    },

    modalDone: {
      marginTop: 6,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },

    modalDoneText: {
      color: theme.colors.buttonText,
      fontFamily: theme.fonts.family,
      fontWeight: "900",
      fontSize: 14,
    },
  });

export default CreateGame3;
