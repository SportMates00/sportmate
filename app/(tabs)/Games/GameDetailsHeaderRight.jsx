import { useTheme } from "@/src/theme/themeContext";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { useTranslation } from "react-i18next"
import { View, TouchableOpacity, Modal, Text, StyleSheet, Share } from "react-native"
import * as Clipboard from 'expo-clipboard';

const GameDetailsHeaderRight = ({tab, isHost, isPlayer, navigation, game, invitePlayers}) => {

    const {t} = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isShareModalVisible, setShareModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const openShareModal = () => setShareModalVisible(true);
    const closeShareModal = () => setShareModalVisible(false);
    const { theme } = useTheme(); // Get current theme and toggle (if needed)
    const styles = getStyles(theme); // Generate dynamic styles based on current theme


    const hostActions = [
  { label: t("editGame"), onPress: () => navigation.navigate("EditGame") },
  { label: t("InvitePlayers"), onPress: invitePlayers },
  { label: t("ShareGame"), onPress: () => openShareModal() },
  { label: t("CancelGame"), onPress: () => navigation.navigate("CancelGame") },
];

    const playerActions = [
  { label: t("ShareGame"), onPress: () => openShareModal() },
  { label: t("LeaveGame"), onPress: () => navigation.navigate("LeaveGame") },
];
  const actions = isHost ? hostActions : playerActions;
  const gameURL = `https://www.sportmate.com/matches/${game.id}`;

  const message = `Hello, check out this ${game.sportName} match at ${game?.venue?.stadiumName}. It still has open spots, you might want to join it \n${gameURL}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(gameURL);
    };

  const openShareSheet = async () => {
    await Share.share({ message });
  };

    return (
       <> 
        { tab !== 'past' &&
        <View style={{flexDirection:'row', gap:5}}>
            
            <TouchableOpacity onPress={openShareModal}>
                <Ionicons name="share-outline" size={28} color={'white'} />
            </TouchableOpacity>
            
            {(isHost || isPlayer) &&
            <TouchableOpacity onPress={openModal}>
                <Ionicons name="ellipsis-vertical" size={28} color={'white'} />
            </TouchableOpacity>
            }
        

            <Modal 
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
                <View style={styles.modalContent}>
                {actions.map((item, index) => (
                    <TouchableOpacity
                    key={index}
                    style={styles.modalButton}
                    onPress={() => {
                        closeModal();
                        item.onPress();
                    }}
                    >
                    <Text style={styles.modalButtonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                <View style={styles.cancelContent}>
                    <TouchableOpacity onPress={closeModal}>
                      <Text style={styles.closeButton}>{t('Cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                visible={isShareModalVisible}
                animationType="slide"
                transparent
                onRequestClose={closeShareModal}
            >
                <TouchableOpacity 
                style={styles.modalOverlay} 
                onPress={closeShareModal} 
                />

                <View style={styles.shareSheet}>
                <Text style={styles.shareTitle}>Share Game</Text>

                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>

                <TouchableOpacity style={styles.row}>
                    <Ionicons name="chatbubble-ellipses-outline" size={22} />
                    <Text style={styles.rowText}>Send in chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={copyToClipboard}>
                    <Ionicons name="link-outline" size={22} />
                    <Text style={styles.rowText}>Copy link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={openShareSheet}>
                    <Ionicons name="ellipsis-horizontal-circle-outline" size={22} />
                    <Text style={styles.rowText}>More options</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.cancelWrap}>
                <TouchableOpacity onPress={closeShareModal} style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </Modal>
        </View>
        }
        </>
    )
}

export default GameDetailsHeaderRight;

const getStyles = (theme) => StyleSheet.create({
  
  header: {
    height: 'auto',
    paddingHorizontal: theme.spacing.medium
  },
  modalOverlay: {
    position:'absolute',
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor: theme.colors.text,
    opacity:0.5
  },
  modalContent: {
    position:'absolute',
    bottom:70,
    height: 'auto',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.semiCircle,
    padding: theme.spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  cancelContent: {
    position:'absolute',
    bottom:20,
    height:40,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.semiCircle,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton:{
    color:theme.colors.buttonText
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: theme.radius.semiCircle,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color:theme.colors.primary,
    fontSize: theme.fonts.size.medium,
  },
    /* -------- SHARE SHEET -------- */

  shareSheet: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.colors.background,
    borderRadius: 18,
    padding: 18
  },

  shareTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: theme.colors.text
  },

  messageBox: {
    backgroundColor: '#eef1f4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },

  messageText: {
    fontSize: 14,
    color: theme.colors.text
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14
  },

  rowText: {
    fontSize: 16,
    marginLeft: 12,
    color: theme.colors.text
  },

  cancelWrap: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center"
  },

  cancelBtn: {
    width: "90%",
    paddingVertical: 14,
    backgroundColor: theme.colors.background,
    borderRadius: 18,
    alignItems: "center"
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text
  }
});