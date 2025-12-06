import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon Library
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/themeContext';

const ContactUs = () => {
      const {theme} = useTheme();
      const styles = getStyles(theme);
      const navigation = useNavigation();
      useLayoutEffect(() => {
          navigation.setOptions({
            headerShadowVisible: false,
                headerStyle: Platform.OS == 'web' ? {
                  borderBottom: 'none',
                  boxShadow: 'none',
                } : {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                },
            headerStyle: {
              backgroundColor:theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              color: theme.colors.text,
              fontSize:theme.fonts.size.large
            },
            headerTitleAlign: 'center',
          });
        }, [navigation]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Error', 'All fields are required!');
    } else {
      Alert.alert('Success', 'Your message has been sent!');
      setForm({ name: '', email: '', message: '' });
    }
  };

  const handleSocialLink = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open link');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Write your message"
        multiline
        numberOfLines={5}
        value={form.message}
        onChangeText={(text) => handleInputChange('message', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {/* Social Media Section */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialHeader}>Follow us on social media:</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: theme.colors.primary }]} // Instagram button
            onPress={() => handleSocialLink('https://www.instagram.com/yourpage')}
          >
            <Ionicons name="logo-instagram" size={30} color="white" />
            <Text style={styles.socialButtonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: theme.colors.primary }]} // Facebook button
            onPress={() => handleSocialLink('https://www.facebook.com/yourpage')}
          >
            <Ionicons name="logo-facebook" size={30} color="white" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.radius.semiCircle,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: theme.radius.semiCircle,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
    borderRadius: theme.radius.semiCircle,
    backgroundColor: '#f0f4f7',
    borderColor: '#ccc',
    borderWidth:1
  },
  socialHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: theme.radius.semiCircle,
    width: '45%',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ContactUs;
