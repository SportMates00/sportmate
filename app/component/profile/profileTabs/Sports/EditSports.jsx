// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { deleteSport, editUserInfo} from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';

const EditSports = ({ setOpenEditSport, openEditSport,sport,setUserInfo, userInfo }) => {
  const levels = ['Beginner', 'Intermediate','Professional', 'Advanced'];
  const [newSport, setNewSport] = useState({sport:'',level:''})
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
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
              {error && <Text style={{color:"red"}}>You can not delete your main sport</Text>}
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

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    width:200,
    height:40,
    justifyContent:'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    flex: 1, // Ensures it takes up the entire screen
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonX :{
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
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
    color: '#333',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    marginBottom: 20,
  },
});

export default EditSports;
