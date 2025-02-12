// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { editUserInfo} from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';

const AddSport = ({ setUserInfo, userInfo }) => {
  const availableSports = ['Football', 'Basketball', 'Tennis', 'Bowling', 'Table Tennis'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const [modalVisible, setModalVisible] = useState(false);
  const [newSport, setNewSport] = useState({sport:'',level:''})
  const [error,setError] = useState(false);
  const [sportExists,setSportExists] = useState(false);
  const dispatch = useDispatch();
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
                  label: sport,
                  value: sport,
                }))}
                placeholder={{ label: 'Select a sport', value: null }}
                style={pickerSelectStyles}
              />

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
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
  },
  addSportContainer: {
    flex:1
  }
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

export default AddSport;
