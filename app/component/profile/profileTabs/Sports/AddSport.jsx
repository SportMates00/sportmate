// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { editUserInfo} from '@/src/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const AddSport = ({ setUserInfo, userInfo }) => {

  const {t} = useTranslation();
  const availableSports = [
    { key: "Football", label: t("Football"),  },
    { key: "Basketball", label: t("Basketball"),  },
    { key: "Tennis", label: t("Tennis"),  },
    { key: "PingPong", label: t("PingPong"),  },
    { key: "Hiking", label: t("Hiking"),  },
    { key: "Tennis1", label: t("Tennis1"),  },
    { key: "PingPong1", label: t("PingPong1"),  },
    { key: "Hiking1", label: t("Hiking1"),  },
  ];
    const levels = [
    { id: "Starter", label: t("Starter") },
    { id: "Beginner", label: t("Beginner") },
    { id: "LowerIntermediate", label: t("LowerIntermediate") },
    { id: "Intermediate", label: t("Intermediate") },
    { id: "Advanced", label: t("Advanced") },
    { id: "Professional", label: t("Professional") }
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [newSport, setNewSport] = useState({sport:'',level:''})
  const [error,setError] = useState(false);
  const [sportExists,setSportExists] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const pickerSelectStyless = pickerSelectStyles(theme);
  const addSport = () => {
    if (!newSport.sport || !newSport.level) { 
      setError(true); // Show error if fields are empty
      return;
    }
  
    // Check if sport already exists
    const sportExists = userInfo.profileInfo.sportsList.some(
      sport => sport.sport.toLowerCase() === newSport.sport.toLowerCase()
    );
  
    if (sportExists || newSport.sport == userInfo.profileInfo.sport) {
      setSportExists(true); // Show error that sport already exists
      return;
    }
  
    // Proceed with adding the new sport
    const updatedProfile = {
      ...userInfo.profileInfo,
      sportsList: [...userInfo.profileInfo.sportsList, newSport],
    };
  
    dispatch(editUserInfo({ ...userInfo, profileInfo: updatedProfile })); 
    setUserInfo(prev => ({ ...prev, profileInfo: updatedProfile })); 
  
    // Reset state
    setError(false);
    setSportExists(false);
    setNewSport({ sport: '', level: '' });
    setModalVisible(false);
  };
  

  return (
    <View style={styles.addSportContainer}>
      {/* Add New Sport Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Sport</Text>
      </TouchableOpacity>

      {/* Modal for Adding a New Sport */}
      {modalVisible && (
        <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add a New Sport</Text>

              {/* Sport Selector */}
              <Text style={styles.label}>Select a Sport:</Text>
              <RNPickerSelect
                onValueChange={(value) => setNewSport({...newSport,sport:value})}
                items={availableSports.map((sport) => ({
                  label: sport.label,
                  value: sport.key,
                }))}
                placeholder={{ label: 'Select a sport', value: null }}
                style={pickerSelectStyless}
              />

              {/* Level Selector */}
              <Text style={styles.label}>Select Your Level:</Text>
              <RNPickerSelect
                onValueChange={(value) => setNewSport({...newSport,level:value})}
                items={levels.map((level) => ({
                  label: level.label,
                  value: level.id,
                }))}
                placeholder={{ label: 'Select a level', value: null }}
                style={pickerSelectStyless}
              />

              {/* Modal Buttons */}
              {sportExists === true && <Text style={{color:'red'}}>Sport already exists</Text>}
              {error === true && <Text style={{color:'red'}}>Please select all fields</Text>}
              <TouchableOpacity onPress={() => addSport()} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Add Sport</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setModalVisible(false); 
                setError(false);
                setSportExists(false);
              }} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.semiCircle,
    alignItems: 'center',
    width:200,
    height:40,
    justifyContent:'center'
  },
  addButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fonts.size.medium,
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    flex: 1, // Ensures it takes up the entire screen
  },
  modalContainer: {
    width: '80%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.semiCircle,
    padding: theme.spacing.large,
    alignItems: 'center',
  },
  modalTitle: {
    color:theme.colors.text,
    fontSize: theme.fonts.size.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
  },
  label: {
    fontSize: theme.fonts.size.medium,
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    color:theme.colors.text
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.semiCircle,
    marginTop: theme.spacing.medium,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fonts.size.medium,
  },
  cancelButton: {
    backgroundColor: theme.colors.primary,
  },
  addSportContainer: {
    flex:1
  },
  
});

const pickerSelectStyles = (theme) => StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4,
    color: theme.colors.text,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4,
    color: theme.colors.text,
    marginBottom: 20,
  },
});

export default AddSport;
