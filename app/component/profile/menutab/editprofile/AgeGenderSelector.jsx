import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AgeGenderSelector = ({editUser, setEditUser}) => {
  const [selectedAge, setSelectedAge] = useState(editUser.profileInfo.age)
  const ages = Array.from({ length: 86 }, (_, i) => i + 14);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={ageStyles.scrollContainer}
    >
      {ages.map((age) => (
        <TouchableOpacity
          key={age}
          style={[
            ageStyles.ageItem,
            selectedAge == age && ageStyles.selectedAgeItem,
          ]}
          onPress={() => {
            setSelectedAge(age)
            setEditUser((prev) => ({
              ...prev,
              profileInfo: { ...prev.profileInfo, age: age },
            }));
          }}
        >
          <Text
            style={[
              ageStyles.ageText,
              selectedAge == age && ageStyles.selectedAgeText,
            ]}
          >
            {age}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AgeGenderSelector;

const ageStyles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 16,
  },
  ageItem: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAgeItem: {
    backgroundColor: '#e0e0e0',
    borderColor: '#007AFF',
     borderWidth:2,
    borderColor:'#007AFF'
  },
  ageText: {
    fontSize: 14,
    color: '#000',
  },
  selectedAgeText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});