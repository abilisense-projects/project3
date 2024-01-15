import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import im1 from '../../assets/images/default-user-image.svg';
import ImageService from '../../services/imageService';
import UserService from '../../services/backendServices/userService';
import { useSelector } from "react-redux";

export default function UploadImage() {
  const [image, setImage] = useState(im1);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector((state) => state.user.user.userData);

  useEffect(() => {
    if (user.profileImage) {
      setImage(user.profileImage);
    }
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      // Call the image functions to encode the image
      try {
        const codedImage = await ImageService.encode(_image.assets[0].uri);
        try {
          const response = await UserService.uploadProfileImage(user._id, codedImage);
        } catch (error) {
          if (error.response && error.response.status === 413) {
            // Payload Too Large error
            setErrorMessage("Image Too Large.");
          } else {
            // Handle other errors
            setErrorMessage(error.message || "An error occurred while uploading the image.");
          }
        }
      } catch (encodeError) {
        // Handle image encoding error
        setErrorMessage("Error encoding image. Please try again.");
      }
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }
  };

  return (
    <View>
      {errorMessage && <Text style={imageUploaderStyles.errorMessage}>{errorMessage}</Text>}
      <View style={imageUploaderStyles.container}>
        {image && <Image source={{ uri: image }} style={imageUploaderStyles.image} />}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadBtnContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  uploadBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    bottom: 0,
  },
});
