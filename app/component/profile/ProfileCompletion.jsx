import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';


const ProfileCompletion = ({ completionSteps = {} }) => {
  const navigation = useNavigation();

  const steps = [
    { key: 'notifications', label: 'Allow Notifications', screen: 'NotificationSettings' },
    { key: 'photo', label: 'Add Photo', screen: 'EditProfile' },
    { key: 'ageGender', label: 'Add Age & Gender', screen: 'EditProfile' },
    { key: 'location', label: 'Add Your Location', screen: 'LocationSettings' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Your Profile</Text>
      {steps.map((step) => (
        <View key={step.key} style={styles.stepRow}>
          <View style={styles.stepLeft}>
            <Text style={styles.stepText}>{step.label}</Text>
          </View>
          <View style={styles.stepRight}>
            {completionSteps[step.key] ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(step.screen)}
                style={styles.actionButton}
              >
                <Text style={styles.buttonText}>Go</Text>
                <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  stepLeft: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
  stepRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginRight: 8,
    fontWeight: 'bold',
  },
});

export default ProfileCompletion;
