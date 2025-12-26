import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Share 
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';

const ProfileOthersHeader = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);

  const navigation = useNavigation();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openShareModal = () => setShareModalVisible(true);
  const closeShareModal = () => setShareModalVisible(false);

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  // -------- SHARE CONTENT --------
  const playerName = "Faj";
  const profileUrl = "https://www.sportmate.com/profile?id=12345";

  const message = `Hello, here is ${playerName}'s profile on SportMate! Check it out to connect and play sports together!\n${profileUrl}`;

const copyToClipboard = async () => {
  await Clipboard.setStringAsync(profileUrl);
};

  const openShareSheet = async () => {
    await Share.share({ message });
  };

  return (
    <View style={styles.container}>

      {/* ------- HEADER BUTTONS ------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openShareModal} style={styles.menuButton}>
          <Ionicons name="share-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal} style={styles.menuButton}>
          <Entypo name="menu" size={30} color={theme.colors.text} />
        </TouchableOpacity>
      </View>


      {/* ------- MAIN MENU MODAL ------- */}
      <Modal 
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />

        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>{t('Add Friend')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>{t('Block')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>{t('Report')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cancelContent}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>



      {/* ------- SHARE PROFILE MODAL ------- */}
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
          <Text style={styles.shareTitle}>Share player</Text>

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
  );
};

const getStyles = (theme) => StyleSheet.create({

  header: {
    height: 'auto',
    paddingHorizontal: theme.spacing.medium,
    flexDirection: 'row',
    gap: 20
  },

  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.text,
    opacity: 0.5
  },

  modalContent: {
    position: 'absolute',
    bottom: 70,
    height: '30%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.semiCircle,
    padding: theme.spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },

  cancelContent: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.semiCircle,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButton: {
    color: theme.colors.buttonText,
    width: '100%',
    textAlign: 'center'
  },

  modalButton: {
    width: '100%',
    padding: 15,
    borderRadius: theme.radius.semiCircle,
    alignItems: 'center',
    marginVertical: 10,
  },

  modalButtonText: {
    color: theme.colors.primary,
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

export default ProfileOthersHeader;
