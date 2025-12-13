import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';

const MenuTab = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openModal} style={styles.menuButton}>
          <Entypo name="menu" size={30} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Modal for Bottom Popup */}
      <Modal 
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
        <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => { 
              closeModal();
              navigation.navigate('EditProfile')}
               } >
              <Text style={styles.modalButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => { 
                closeModal();
                navigation.navigate('Settings')}
                 } // Replace 'Page2' with your actual route name
            >
              <Text style={styles.modalButtonText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => { 
                closeModal();
                navigation.navigate('ProfileViewers')}
                 } 
            >
              <Text style={styles.modalButtonText}>Profile Viewers</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.cancelContent}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  
  header: {
    height: 'auto',
    paddingHorizontal: theme.spacing.medium
  },
  menuButton: {
    padding: theme.spacing.small,
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
    height: '40%',
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
});

export default MenuTab;
