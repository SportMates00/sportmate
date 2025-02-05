import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileCompletion = ({ completionSteps = {} }) => {
  const navigation = useNavigation();

  const steps = [
    { key: 'photo', label: 'Add photo & name', screen: 'EditProfile' },
    { key: 'ageGender', label: 'Add age & gender', screen: 'EditProfile' },
    { key: 'location', label: 'Set your location', screen: 'EditProfile' },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <TouchableOpacity 
          key={step.key} 
          style={styles.stepRow} 
          onPress={() => !completionSteps[step.key] && navigation.navigate(step.screen)}
        >
          <Ionicons
            name={completionSteps[step.key] ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={completionSteps[step.key] ? '#1E90FF' : '#999'}
          />
          <Text style={styles.stepText}>{step.label}</Text>
          {!completionSteps[step.key] && (
            <Ionicons name="chevron-forward" size={20} color="#999" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default ProfileCompletion;
