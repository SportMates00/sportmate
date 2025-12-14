// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { deleteSport, editUserInfo} from '@/src/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const EditSports = ({ setOpenEditSport, openEditSport,sport,setUserInfo, userInfo }) => {
  
  const { t } = useTranslation();
  const levels = [
    { id: "Starter", label: t("Starter") },
    { id: "Beginner", label: t("Beginner") },
    { id: "LowerIntermediate", label: t("LowerIntermediate") },
    { id: "Intermediate", label: t("Intermediate") },
    { id: "Advanced", label: t("Advanced") },
    { id: "Professional", label: t("Professional") }
  ];
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
              <Modal 
                transparent={true}
                animationType="slide"
                onRequestClose={() => setOpenEditSport(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setOpenEditSport(false)} />
                <View style={styles.modalContent}>
                    <TouchableOpacity 
                      style={styles.modalButton} 
                      onPress={() => { 
                      setOpenEditSport(false)
                      }
                       } >
                      <Text style={styles.modalButtonText}>Set as main sport</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity 
                      style={styles.modalButton} 
                      onPress={() => { 
                        setOpenEditSport(false)
                        }
                         } // Replace 'Page2' with your actual route name
                    >
                      <Text style={styles.modalButtonText}>Change level</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={() => { 
                        setOpenEditSport(false)
                        }
                         } 
                    >
                      <Text style={styles.modalButtonText}>Remove sport</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cancelContent}>
                    <TouchableOpacity onPress={() => setOpenEditSport(false)}>
                      <Text style={styles.closeButton}>Cancel</Text>
                    </TouchableOpacity>
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
