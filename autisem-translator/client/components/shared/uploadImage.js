import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import im1 from '../../assets/images/default-user-image.svg'

export default function UploadImage() {
  const [image, setImage] = useState(im1);

  useEffect(() => {
    checkForCameraRollPermission()
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      // console.log(_image.assets[0].uri)
      setImage(_image.assets[0].uri);
      console.log(image)
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    } else {
      console.log('Media Permissions are granted')
    }
  }
  return (<>
    <View style={imageUploaderStyles.container}>
      {image && <Image source={{ uri: image }} style={imageUploaderStyles.image} />}
      <View style={imageUploaderStyles.uploadBtnContainer}>
      <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
        <AntDesign name="camera" size={20} color="black" />
      </TouchableOpacity>
    </View>
    </View>
  
  </>
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
  uploadBtnContainer:{
    position:'absolute',
    right:0,
    bottom:0,
    width:'100%',
    height:'30%',
},
  uploadBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
