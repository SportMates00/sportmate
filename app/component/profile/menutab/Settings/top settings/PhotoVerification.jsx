import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

const PhotoVerification = ({ onPhotoVerified }) => {
  const { t } = useTranslation();
  const [photoUri, setPhotoUri] = useState(null);

  const handlePhotoUpload = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'front',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
        onPhotoVerified();
      }
    });
  };

  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'front',
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
        onPhotoVerified();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {t('PhotoVerificationDescription')}
      </Text>

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      ) : (
        <Text style={styles.instructions}>
          {t('NoPhotoUploaded')}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePhotoUpload}>
        <Text style={styles.buttonText}>
          {t('UploadPhoto')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>
          {t('TakePhoto')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PhotoVerification;
