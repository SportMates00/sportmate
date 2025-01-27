import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon Library

const ContactUs = () => {
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
      <Text style={styles.header}>Contact Us</Text>

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
            style={[styles.socialButton, { backgroundColor: '#E1306C' }]} // Instagram button
            onPress={() => handleSocialLink('https://www.instagram.com/yourpage')}
          >
            <Ionicons name="logo-instagram" size={30} color="white" />
            <Text style={styles.socialButtonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#3b5998' }]} // Facebook button
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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
    backgroundColor: '#6a11cb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f0f4f7',
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
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ContactUs;
