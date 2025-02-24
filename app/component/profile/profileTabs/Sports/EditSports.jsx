// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { deleteSport, editUserInfo} from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/app/theme/themeContext';

const EditSports = ({ setOpenEditSport, openEditSport,sport,setUserInfo, userInfo }) => {
  const levels = ['Beginner', 'Intermediate','Professional', 'Advanced'];
  const [newSport, setNewSport] = useState({sport:'',level:''})
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const editSport = () => {
    if (!newSport.level) return; // Prevent update if no new level is selected
  
    // Update the level of the selected sport
    const updatedSportsList = userInfo.profileInfo.sportsList.map(item => 
      item.sport === sport.sport ? { ...item, level: newSport.level } : item
    );
  
    // Update Redux and local state
    const updatedProfile = {
      ...userInfo.profileInfo,
      sportsList: updatedSportsList,
    };
  
    if(sport.sport == userInfo.profileInfo.sport) {
        dispatch(editUserInfo({ ...userInfo, profileInfo: {...userInfo.profileInfo, level:newSport.level} }));
    setUserInfo(prev => ({ ...prev, profileInfo: {...userInfo.profileInfo, level:newSport.level} }));
    }else {
        dispatch(editUserInfo({ ...userInfo, profileInfo: updatedProfile }));
        setUserInfo(prev => ({ ...prev, profileInfo: updatedProfile }));
    }
  
    setOpenEditSport(false); // Close modal
  };
  const deleteSelectedSport = () => {
    // Update Redux store
    if(sport.sport == userInfo.profileInfo.sport){
        setError(true)
    }else {
        dispatch(deleteSport(sport.sport));
        setError(false);
    // Update local state immediately
    setUserInfo(prev => ({
      ...prev,
      profileInfo: {
        ...prev.profileInfo,
        sportsList: prev.profileInfo.sportsList.filter(item => item.sport !== sport.sport),
      },
      
    }));
  
    // Close modal
    setOpenEditSport(false);
    setError(false);
    }
  };

  return (
    <View style={styles.addSportContainer}>
      {/* Modal for Adding a New Sport */}
      {openEditSport && (
        <Modal transparent={true} animationType="slide" visible={openEditSport} onRequestClose={() => setOpenEditSport(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Sport</Text>

              {/* Sport Selector */}
              <Text style={styles.label}>Selected sport: {sport.sport}</Text>
              

              {/* Level Selector */}
              <Text style={styles.label}>Select Your Level:</Text>
              <RNPickerSelect
                onValueChange={(value) => setNewSport({...newSport,level:value})}
                items={levels.map((level) => ({
                  label: level,
                  value: level,
                }))}
                placeholder={{ label: 'Select a level', value: null }}
                style={pickerSelectStyles}
                value={sport.level}
              />

              {/* Modal Buttons */}
              {error && sport.sport == userInfo.profileInfo.sport && <Text style={{color:"red"}}>You can not delete your main sport</Text>}
              <TouchableOpacity onPress={() => editSport()} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Update Sport</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSelectedSport()} style={[sport.sport == userInfo.profileInfo.sport ? styles.modalButtonX : styles.modalButton]}>
                <Text style={styles.modalButtonText}>Delete Sport</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setError(false)
                setOpenEditSport(false); 
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
    marginBottom: theme.spacing.large,
  },
  label: {
    fontSize: theme.fonts.size.medium,
    marginTop: theme.spacing.small,
    marginBottom: 5,
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
  modalButtonX :{
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.semiCircle,
    marginTop: theme.spacing.medium,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: theme.colors.primary,
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'white',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'white',
    marginBottom: 20,
  },
});

export default EditSports;
