// AddSport component update
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';

const AddSport = ({ sports, setSports }) => {
  const availableSports = ['Football', 'Basketball', 'Tennis', 'Bowling', 'Table Tennis'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const addSport = () => {
    if (selectedSport && selectedLevel) {
      setSports([...sports, { id: Date.now(), name: selectedSport, level: selectedLevel }]);
      setSelectedSport('');
      setSelectedLevel('');
      setModalVisible(false);
    }
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
                onValueChange={(value) => setSelectedSport(value)}
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
                onValueChange={(value) => setSelectedLevel(value)}
                items={levels.map((level) => ({
                  label: level,
                  value: level,
                }))}
                placeholder={{ label: 'Select a level', value: null }}
                style={pickerSelectStyles}
              />

              {/* Modal Buttons */}
              <TouchableOpacity onPress={addSport} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Add Sport</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
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
    padding: 15, // Adding padding to ensure the button is touchable
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
